const app = require("./app");
const port = process.env.PORT || 8080;
const Socket = require("./Socket");

Socket.listen();

app.listen(port, () => {
    console.log('Started server on port ' + port);
});