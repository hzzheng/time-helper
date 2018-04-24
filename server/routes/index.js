const Router = require("koa-router");

const router = new Router({
  prefix: "/api"
});

router.get("/:type/tasks", ctx => {
  ctx.body = {};
});
