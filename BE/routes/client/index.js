const NewsRoute = require("./News.route")
const HomeRoute = require("./Home.route");
module.exports = (app) => {

    app.use("/",HomeRoute);
    app.use("/news",NewsRoute);
}