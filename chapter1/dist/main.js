"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const app = new hono_1.Hono();
app.get("/", (c) => {
    return c.text("Hello 3rcd.com!");
});
const port = 8080;
console.log(`Server is running on http://localhost:${port}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port,
});
//# sourceMappingURL=main.js.map