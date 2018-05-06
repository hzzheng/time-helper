const Targets = require('../models/targets')

module.exports = {
  async initUserAndTargets(username) {
    const targets = new Targets({
      username,
    })

    await targets.save()
  },

  async findTargets(username) {
    const targets = await Targets.find({
      username
    })

    return targets
  },

  async addNewTarget({
    username,
    type,
    target
  }) {
    const targets = await Targets.findOne({
      username
    })

    targets[`${type[0]}_targets`].push(target)

    targets.save()
  },

  async updateOldTarget({
    username,
    type,
    target
  }) {
    const targets = await Targets.findOne({
      username
    })
    const {
      name,
      relative_id
    } = target;

    const subdoc = targets[`${type[0]}_targets`].id(target._id)

    subdoc.name = name;
    subdoc.relative_id = relative_id;

    targets.save()
  },
}