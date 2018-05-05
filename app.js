const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const router = require('./server/routes')

mongoose.connect('mongodb://localhost/blog')

const app = new Koa()

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

// handle 404
app.use(ctx => {
  ctx.body = {
    success: false,
    message: '404 not found',
  }
})

app.listen(4000)
