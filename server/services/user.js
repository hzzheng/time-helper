const User = require('../models/user')

module.exports = {
  async createUser(name) {
    const user = new User({
      name,
    })

    return await user.save()
  },
}
