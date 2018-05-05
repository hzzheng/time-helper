const Router = require('koa-router')
const { exec } = require('child_process')
const { addUser, fetchTargets, addTarget } = require('../controllers/targets')

const router = new Router({
  prefix: '/wx/api',
})

/**
 * 自动部署
 */
router.post('/post-receive', async (ctx, next) => {
  const fetchCode = new Promise((resolve, reject) => {
    exec('cd ../.. & git pull origin master & pm2 restart app', (error, stdout) => {
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
router.get('/:username/targets', fetchTargets)

/**
 * 添加目标
 */
router.post('/:username/:type/target', addTarget)

module.exports = router
