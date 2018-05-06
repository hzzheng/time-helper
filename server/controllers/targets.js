const {
  exec,
  execSync
} = require('child_process')
const {
  initUserAndTargets,
  findTargets,
  addNewTarget,
  updateOldTarget
} = require('../services/targets')

module.exports = {
  async addUser(ctx) {
    const {
      username
    } = ctx.request.body
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
    const {
      username
    } = ctx.params

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
    const {
      username,
      type
    } = ctx.params
    const {
      target
    } = ctx.request.body

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

  async updateTarget(ctx) {
    const {
      username,
      type
    } = ctx.params
    const {
      target
    } = ctx.request.body

    try {
      await updateOldTarget({
        username,
        type,
        target,
      })
      ctx.body = {
        success: true,
        message: '修改目标成功',
      }
    } catch (err) {
      ctx.body = {
        success: false,
        message: '修改目标失败',
      }
    }
  },

  async autoDeploy(ctx) {
    const fetchCode = new Promise((resolve, reject) => {
      exec('cd ../.. & git pull origin master', (error, stdout) => {
        if (error) {
          return reject(error)
        }
        resolve(stdout)
      })
    })

    try {
      await fetchCode
      ctx.body = {
        success: true,
      }
      process.nextTick(() => {
        execSync('pm2 restart app')
      })
    } catch (err) {
      ctx.body = {
        success: false,
      }
    }
  },
}