const { initUserAndTargets, findTargets, addNewTarget } = require('../services/targets')

module.exports = {
  async addUser(ctx) {
    const { username } = ctx.request.body
    try {
      await initUserAndTargets(username)
      ctx.body = {
        success: true,
        message: '注册成功',
      }
    } catch (err) {
      ctx.body = {
        success: false,
        message: '注册失败',
      }
    }
  },

  async fetchTargets(ctx) {
    const { username } = ctx.params

    try {
      const targets = await findTargets(username)
      ctx.body = {
        success: true,
        result: targets,
      }
    } catch (err) {
      ctx.body = {
        success: false,
        message: '获取目标失败',
      }
    }
  },

  async addTarget(ctx) {
    const { username, type } = ctx.params
    const { target } = ctx.request.body

    try {
      await addNewTarget({
        username,
        type,
        target,
      })
      ctx.body = {
        success: true,
        message: '添加目标成功',
      }
    } catch (err) {
      ctx.body = {
        success: false,
        message: '添加目标失败',
      }
    }
  },
}
