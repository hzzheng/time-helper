const { exec } = require('child_process')
const Router = require('koa-router')
const { register } = require('../controllers/user')

const router = new Router({
  prefix: '/wx/api',
})

router.post('/pull', ctx => {
  exec('cd ../.. & git pull origin master', (error, stdout) => {
    if (error) {
      ctx.body = {
        success: false,
        error: error,
      }
      return
    }
    // eslint-disable-next-line
    console.log(stdout)
    ctx.body = {
      success: true,
    }
  })
})

router.get('/user', register)

router.get('/:type/tasks', ctx => {
  ctx.body = `${ctx.params.type}/tasklist`
})

router.get('/:type/task/:id', ctx => {
  ctx.body = `${ctx.params.type}/task/${ctx.params.id}`
})

module.exports = router
