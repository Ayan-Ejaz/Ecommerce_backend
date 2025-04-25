const redis = require("ioredis")
const { order, carrier, product, user } = require('../../models')
const redisClient = new redis();
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    
const addProductToCart = async (productId, quantity, userId) => {
    const cartKey = `cart:${userId}`;

    const cart = await redisClient.hgetall(cartKey)

    if (cart[productId]) {
        cart[productId] = Number(cart[productId]) + quantity
    }
    else 
        cart[productId] = quantity;

    await redisClient.hmset(cartKey, cart);

    await redisClient.zincrby('most_added',quantity, productId)
    
    const cachedProductKey = `product:${productId}`
    const cachedProduct = await redisClient.get(cachedProductKey);

    if (!cachedProduct) {
        const fetchedProduct = await product.findByPk(productId)
        if (fetchedProduct) {
            await redisClient.set(cachedProductKey, JSON.stringify(fetchedProduct))
        }
    }

    return {
        productId,
        quantity:cart[productId]
    }
}   

const deleteProductFromCart = async (productId, id, userId) => {
    const cartKey = `cart:${userId}`;

    await redisClient.hdel(cartKey, productId);

    const updatedCart = await redisClient.hgetall(cartKey);

    return updatedCart;
}

const placeOrder = async (UserId) => {
    const cartKey= `cart:${UserId}`

    const cart = await redisClient.hgetall(cartKey);

    if (!cart || Object.keys(cart).length == 0) {
        throw new Error('Cart is Empty')
    }

    return await processOrder(UserId, cart)
}

const processOrder = async (UserId, Cart) => {
    let total = 0;
    for (let item in Cart) {
        const Product = await product.findByPk(item)
        const itemPrice = Product.price
        const quantity = Number(Cart[item])
        total += (quantity * itemPrice)
    }

    const customer = await user.findByPk(UserId)
    const userLocation = customer.Address.city;

    const deliveryPerson = await findCarrier(userLocation)

    if (!deliveryPerson) {
        throw new Error('No carrier Available')
    }
    await order.create({
        customerId: UserId,
        carrier: deliveryPerson,
        location: carrier.location,
        amount:total,
        status:'in-progress'
    })

    await redisClient.del(`cart:${UserId}`)

    return true;


}

const findCarrier = async (userLocation) => {
    const availableCarriers = await carrier.findAll({
        where: {
            status: 'free',
            'Address.city': userLocation
        }
    });

    return availableCarriers.length > 0 ? availableCarriers[0] : null;
}

const orderDelivered = async (CarrierId, UserId, OrderId) => {
   
    await carrier.update(
        { status: 'free' },
        { where: { id: CarrierId } }
      )
      
      await order.update(
        { status: 'delivered' },
        { where: { id: OrderId } }
      )

    NotifyUser(UserId)
}

const NotifyUser = async (UserId) => {
    
    const User = await User.findByPk(UserId)

    async function sendSMS() {
        try {
            const message = await twilio.messages.create({
                body: 'Your order has been delivered',
                from: process.env.TWILIO_PHONE_NUMBER,
                to: User.Contact
            });
            console.log(`SMS sent with SID: ${message.sid}`);
        } catch (error) {
            console.error(`Error sending SMS: ${error.message}`);
        }
    }
    
    sendSMS();
}
module.exports = {addProductToCart, deleteProductFromCart, placeOrder, processOrder, orderDelivered}