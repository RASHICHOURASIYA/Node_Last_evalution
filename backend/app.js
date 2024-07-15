const express = require("express");
const http = require('http');
const dotenv = require("dotenv");
const socketIo = require('socket.io');
const authRoutes = require("./src/routes/authRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const bookRoutes = require("./src/routes/bookRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const sequelize = require("./src/configs/mysql.db");
const connectDB = require("./src/configs/mongo.db");
const EventEmitter = require('./src/utils/eventEmitter');
const cors = require("cors");
const {sendOrderConfirmationEmail} = require('./src/utils/email');
const cron = require('node-cron');
const morgan = require("morgan");
const path = require('path');
const fs = require('fs');
const FileStreamRotato = require('file-stream-rotator');

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log("New client connected");

    EventEmitter.on('orderPlaced', (order) => {
        socket.emit('orderPlaced', order);
    });

    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });
});

cron.schedule('0 0 * * 0', async () => {
    await sendOrderConfirmationEmail();
    console.log('email sends from  appjs');
});

const logDirectory = path.join(__dirname, 'public');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = FileStreamRotato.getStream({
    date_format : 'YYYYMMDD',
    filename : path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false 
});

app.use(morgan('combined', {stream: accessLogStream}))
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    res.send("This is the home route");
});


app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);

(async () => {
    try {
        await sequelize.sync();
        await connectDB();
        console.log('Databases synced successfully.');
    } catch (error) {
        console.error('Failed to sync databases:', error);
    }
})();

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
