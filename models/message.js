const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  content: String, 
  geofence: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  } 
})

const Message = mongoose.model('message', MessageSchema)
module.exports = Message



//   create_table "messages", force: :cascade do |t|
//   t.string "content"
//   t.text "geofence"
//   t.integer "broadcast_id"
//   t.boolean "selected", default: false
//   t.datetime "created_at", null: false
//   t.datetime "updated_at", null: false
// end