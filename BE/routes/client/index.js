const NewsRoute = require("./News.route")
const HomeRoute = require("./Home.route");
const ContactRoute = require("./Contact.route");
module.exports = (app) => {

    app.use("/",HomeRoute);
    app.use("/news",NewsRoute);
    app.use("/contacts", ContactRoute);
}