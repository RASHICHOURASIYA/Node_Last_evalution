const nodemailer = require('nodemailer');
const { Email_User, Email_Pass } = process.env;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: Email_User,
      pass: Email_Pass,
    },
});

const sendOrderConfirmationEmail = async (customerEmail, orderId) =>{
    const mailOption = {
        from: Email_User,
        to: "customerEmail", 
        subject: "Order Confirmation ✔",
        text: `your order with ID ${orderId} has been successfully placed.`,
    };
    try{
        await transporter.sendMail(mailOption);
        console.log(`order confirmation emai sent to ${customerEmail}`);

    }catch(error){
        console.error(error)
    }
};

module.exports = sendOrderConfirmationEmail;