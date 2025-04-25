const apiGateway = require('./Src/api/apiRoutes');

const PORT = 3000;

apiGateway.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
