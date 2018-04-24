const Koa = require("koa");
const router = require("./server/routes");

const app = new Koa();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(4000);
