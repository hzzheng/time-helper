const { exec } = require('child_process')
const Router = require('koa-router')
const { register } = require('../controllers/user')

const router = new Router({
  prefix: '/wx/api',
})

router.post('/pull', async (ctx, next) => {
  const fetchCode = new Promise((resolve, reject) => {
    exec('cd ../.. & git pull origin master', (error, stdout) => {
      if (error) {
        reject(error)
        return
      }
      resolve(stdout)
    })
  })

  try {
    await fetchCode
    ctx.body = {
      success: true,
    }
  } catch (err) {
    await next(err)
  }
})

router.get('/user', register)

router.get('/:type/tasks', ctx => {
  ctx.body = `${ctx.params.type}/tasklist`
})

router.get('/:type/task/:id', ctx => {
  ctx.body = `${ctx.params.type}/task/${ctx.params.id}`
})

module.exports = router
