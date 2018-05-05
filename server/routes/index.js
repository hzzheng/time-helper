const Router = require('koa-router')
const { exec } = require('child_process')
const { addUser } = require('../controllers/targets')

const router = new Router({
  prefix: '/wx/api',
})

/**
 * 自动部署
 */
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

/**
 * 微信认证
 */
router.get('/checksignature', ctx => {
  // const { signature, timestamp, nonce } = ctx.query

  ctx.body = 'echostr'
})

/**
 * 用户注册
 */
router.post('/user', addUser)

/**
 * 获取目标
 */
// router.get('/:username/targets', register)

module.exports = router
