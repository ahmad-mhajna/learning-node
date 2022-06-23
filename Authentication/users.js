const mongoose = require("mongoose");
const DatebaseUrl = process.env.Datebase_Url;
mongoose.connect(DatebaseUrl, { useNewUrlParser: true });
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// ****************
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ name: email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};
// ****************
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});
// ****************
const User = mongoose.model("user", userSchema);
module.exports = User;
