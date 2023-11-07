const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  siteURL: String,
  siteUsrName: String,
  sitePassword: String,
});

const userSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userPassword: String,
  userSites: [siteSchema],
});

// var User  = mongoose.model("user", userSchema)

// export default User ;
// module.exports =  { User }
User = mongoose.model("User", userSchema);
module.exports = User;
