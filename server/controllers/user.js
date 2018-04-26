const { createUser } = require('../services/user')

module.exports = {
  async register(ctx) {
    const { name } = ctx.query
    try {
      await createUser(name)
      ctx.body = {
        success: true,
      }
    } catch (err) {
      ctx.body = {
        success: false,
        message: '注册失败',
      }
    }
  },
}
