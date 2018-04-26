const Router = require('koa-router')
const { register } = require('../controllers/user')

const router = new Router({
  prefix: '/api',
})

router.get('/user', register)

router.get('/:type/tasks', ctx => {
  ctx.body = `${ctx.params.type}/tasklist`
})

router.get('/:type/task/:id', ctx => {
  ctx.body = `${ctx.params.type}/task/${ctx.params.id}`
})

module.exports = router
