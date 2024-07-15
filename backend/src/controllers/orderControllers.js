const Customer = require("../models/customer");
const Order = require("../models/Order");
const sendOrderConfirmationEmail = require("../utils/email");
const eventEmitter = require("../utils/eventEmitter");
const logger = require("../utils/logger");


const getOrdersByCustomer = async (req, res) => {
    try {
        const orders = await Order.findAll({ where: { customerId: req.params.customerId }, include: [Customer] });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const placeOrder = async (req, res, next)=>{
    try{
        const order = await Order.create(req.body);

        eventEmitter.emit('orderPlaced', order);
        await sendOrderConfirmationEmail(order.customerEmail, order.id);


        logger.info(`order placed Order_ID: ${order.id}`);

        res.status(201).json({message :"order placed successfully", order});

    }catch(error){
        logger.error(`Error placing order: ${error.message}`);
        next(error)
    }
};

module.exports = {getOrdersByCustomer, placeOrder}


