const app = require('./app')

const mongoose = require("mongoose");

const DB_HOST = "mongodb+srv://Vitalii:fJyS4tuYU5asVDMA@cluster0.4pdwdej.mongodb.net/booksReader?retryWrites=true&w=majority";

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000)
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })

