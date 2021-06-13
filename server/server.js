const http = require("http");
const httpApp = require("./infrustructure/app.js");
const socketRoutes = require("./infrustructure/socketRoutes.js");

const server = http.createServer(httpApp);
socketRoutes(server);

const port = parseInt(process.env.PORT) || 8000;
server.listen(port, () => console.log(`Server is running on port ${port}`));
