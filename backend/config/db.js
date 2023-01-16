const mongoose = require("mongoose");

connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(
      "mongodb+srv://postbook:postbook123@cluster0.eafoavd.mongodb.net/postbook?retryWrites=true&w=majority"
    );
    console.log("DB connection established");
  } catch (err) {
    console.log(err);
  }
};
module.exports = connect;
