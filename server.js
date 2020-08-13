require("dotenv").config()
const morgan = require("morgan");
const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan("dev"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";
// mongoose.connect(MONGODB_URI,{  
//     useNewUrlParser:true,
//     useFindAndModify:false
// })

let Uri = "mongodb://localhost/workout";
if (process.env.NODE_ENV == "production") {
    uri = process.env.MONGODB_URI
}
mongoose.connect(Uri, {useNewUrlParser:true, useFindAndModify: false, useUnifiedTopology: true});

require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

app.listen(PORT,function(){ 
    console.log(`App listening on Port ${PORT}`);
});