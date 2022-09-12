const mongoose = require("mongoose");
const db =
  process.env.DATABASE ||
  "mongodb+srv://r4rohitm:rrmahajan@cluster0.mqqe7sn.mongodb.net/wtfapi?retryWrites=true&w=majority";

const connection = mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports = connection;
