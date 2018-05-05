const Targets = require('../models/targets')

module.exports = {
  async initUserAndTargets(username) {
    const targets = new Targets({
      username,
    })

    await targets.save()
  },
  async findTargets(username) {
    const targets = await Targets.find({ username })

    return targets
  },
}
