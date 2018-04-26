const Koa = require('koa')
const mongoose = require('mongoose')
const router = require('./server/routes')

mongoose.connect('mongodb://localhost/blog')

const app = new Koa()

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(4000, () => {
  console.log('listening on port 4000') // eslint-disable-line
})
