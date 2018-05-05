const Targets = require('../models/targets')

module.exports = {
  async initUserAndTargets(username) {
    console.log(username)
    const targets = new Targets({
      username,
    })

    await targets.save()
  },
}
