const Router = require('koa-router')
const { addUser, fetchTargets, addTarget, autoDeploy } = require('../controllers/targets')

const router = new Router({
  prefix: '/wx/api',
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

/**
 * 修改目标
 */
router.put('/:username/:type/target', async ctx => {
  // TODO
  ctx.body = 'update successly'
})

/**
 * 健康检查
 */
router.get('/health', async ctx => {
  // TODO
  ctx.body = 'ok'
})

/**
 * 自动部署
 */
router.post('/post-receive', autoDeploy)

module.exports = router
