## E-Commerce Backend System
This is a scalable and modular e-commerce backend system built using Node.js, Express, and Sequelize ORM. It follows a layered architecture and integrates moden backend practices including Redis caching, Stripe payment gateway, and Twilio SMS notifications. It includes three services - product, order and payment.

**Features:**

Layered Architecture: Clean separation between controllers, services, and data layers for maintainability and scalability.
%
Role-Based Authorization: Admin and user roles with restricted access controls.

API Gateway: Centralized routing of requests to services like /product, /order, and /payment.

**Redis Integration:**

Cart Management: User cart state is maintained in Redis for quick access.

Caching: Frequently added-to-cart products are cached to reduce database lookups.

Stripe Payment Gateway: Secure and real-world payment handling using Stripe’s paymentIntent API.

Twilio SMS Notifications: Real-time SMS notifications on delivery

MySQL with Sequelize: SQL database support with Sequelize models and migrations.

Error Handling & Validations: Centralized error handlers and input validation to ensure robust API behavior.

**How to access it:**

1. Clone the repository: git clone https://github.com/Ayan-Ejaz/Ecommerce_backend
2. Navigate to the directory: Ecommerce_backend
3. Install dependencies: npm install
4. Create a .env file in root
5. Run migrations: npx sequelize-cli db:migrate
6. Start the server

**Feedback:**

If you have any feedback or suggestions, feel free to share. I’m open to learning and always excited to improve.










