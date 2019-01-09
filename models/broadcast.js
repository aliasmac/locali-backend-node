const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BroadcastSchema = new Schema({
  name: String, 
  code: String, 
  saved: {
    type: Boolean,
    default: false 
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'message'
  }]

})

const Broadcast = mongoose.model('broadcast', BroadcastSchema)
module.exports = Broadcast








//   create_table "broadcasts", force: :cascade do |t|
//   t.string "name"
//   t.string "code"
//   t.integer "broadcaster_id"
//   t.boolean "saved", default: false
//   t.datetime "created_at", null: false
//   t.datetime "updated_at", null: false
// end