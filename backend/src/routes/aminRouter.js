const express = require('express');
const adminrouter = express.Router();
const fs = require('fs');
const fastcsv = require('fastcsv');
const Order = require('../models/Order');


adminrouter.get('/export-order', async (req, res, next)=>{
    try{

    const filename = 'order.csv';
    const filepath = `./exports/${filename}`;


    const orders = await Order.findAll();

    const ws = fs.createWriteStream(filepath);
    const csvStream = fastcsv.format({headers: true});

    csvStream.pipe(ws);

    orders.forEach(order =>{
        csvStream.write({
            OrderId : order.isSoftDeleted,
            CustomerName : order.CustomerName,
            customerEmail : order.customerEmail,
        });
    });

    csvStream.end();


    res.setHeader('Contect-Type', 'text/csv');
    res.setHeader('Contect-Disposition', `attachment : filename=${filename}`);

    fs.createReadStream(filepath).pipe(res);
} catch(error){
    next(error);
}
});



module.exports = adminrouter;