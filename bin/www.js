const http = require("http");
const { createApp } = require("../src/app.js");
const detectPort = require("detect-port");

async function startServer() {
    // Get port from environment and store in Express.
    const port = process.env.PORT || (await detectPort(3000));
    const app = await createApp();

    app.set("port", port);

    // Create HTTP server.
    const server = http.createServer(app);

    server.listen(port, "127.0.0.1");
    server.on("error", onError);
    server.on("listening", () => onListening(server));
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(server) {
    const { address, port } = server.address();

    console.log(`\nListening on http://${address}:${port}\n`);
}

startServer();
