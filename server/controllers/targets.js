const Target = require('../models/targets')
const { initUserAndTargets } = require('../services/targets')

module.exports = {
  async addUser(ctx) {
    const { username } = ctx.request.body
    try {
      await initUserAndTargets(username)
      ctx.body = {
        success: true,
        messager: '注册成功',
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
      const targets = await Target.find({ username })
      ctx.body = {
        success: true,
        result: targets,
      }
    } catch (err) {
      ctx.body = {
        success: false,
        result: null,
      }
    }
  },
}
