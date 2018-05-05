const mongoose = require('mongoose')

const TargetsSchema = mongoose.Schema({
  username: String,
  y_targets: [
    {
      id: String,
      name: String,
      complete: Boolean,
    },
  ],
  m_targets: [
    {
      id: String,
      name: String,
      complete: Boolean,
      relative_id: String,
    },
  ],
  w_targets: [
    {
      id: String,
      name: String,
      complete: Boolean,
      relative_id: String,
    },
  ],
  d_targets: [
    {
      id: String,
      name: String,
      complete: Boolean,
      relative_id: String,
    },
  ],
})
const Targets = mongoose.model('User', TargetsSchema)

module.exports = Targets
