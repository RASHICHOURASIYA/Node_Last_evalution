//const app = require("./app");
//const dotenv = require("dotenv");
//const sequelize = require("./src/configs/mysql.db");
//
//dotenv.config();
//
//const port = process.env.PORT || 3001;
//
//
//app.get("/api", (req, res) => {
//    res.send("This is the home route");
//});
//
//
//sequelize.sync().then(() => {
//  app.listen(port, () => {
//    console.log(`Server running on port ${port}`);
//  });
//});
