const mongoose = require('mongoose');
const {config} = require("../config/secretData");
// panda3 -> מיצג את השם של המסד נתונים
// mongoose.connect('mongodb://localhost:27017/panda3', {useNewUrlParser: true, useUnifiedTopology: true});
// התחברות לענן במקום לשרת הלוקאלי שמדמה מונגו
mongoose.connect(`mongodb+srv://${config.mongoUser}:${config.mongoPass}@cluster0.kej55.mongodb.net/pandot`, {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("mongo connect");
  // we're connected!
});

module.exports = db;