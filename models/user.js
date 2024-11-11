const mongoose = require("mongoose");

function dbConnection() {
    mongoose
        .connect(
            "mongodb+srv://nikhilsingh888787:Nikhil2710@cluster0.y3mbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        )
        .then(() => {
            console.log("Connected to database");
        })
        .catch((err) => {
            console.log("Cannot connect to database", err);
        });
}


const userSchema = mongoose.Schema({
    image: String,
    email: String,
    name: String,
});

const User = mongoose.model("user", userSchema);

module.exports = {User, dbConnection}