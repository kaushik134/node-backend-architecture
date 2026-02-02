const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const connectDB = require('./src/config/db');

const responseHandler = require('./src/utils/responseHandler');
const errorHandler = require('./src/middlewares/errorHandler');
const resMessage = require('./src/utils/resMessage');
const responseCode = require('./src/utils/responseCode');

const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(responseHandler);

app.use('/api/auth', authRoutes);

app.get('/api', (req, res) => {
    res.success({}, 'Welcome to the Node.js Production API');
});

app.use((req, res, next) => {
    res.status(responseCode.notFound).json({
        status: responseCode.notFound,
        message: resMessage.notFound,
        data: {},
    });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
