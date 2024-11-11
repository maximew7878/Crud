const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user"); // Import the module
const { dbConnection } = require("./models/user"); // Destructure to get dbConnection
dbConnection(); // Connect to the database

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/read", async (req, res) => {
    // Use userModel.User to access the model
    let users = await userModel.User.find();
    res.render("read", { users });
});

app.get("/edit/:userid", async (req, res) => {
    // Access the User model from the object
    let user = await userModel.User.findOne({ _id: req.params.userid });
    res.render("edit", { user });
});

app.post("/update/:userid", async (req, res) => {
    let { image, name, email } = req.body;
    // Use userModel.User to perform the update
    let user = await userModel.User.findOneAndUpdate(
        { _id: req.params.userid },
        { image, name, email },
        { new: true }
    );
    res.redirect("/read");
});

app.get("/delete/:id", async (req, res) => {
    // Access the User model for deletion
    await userModel.User.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
});

app.post("/create", async (req, res) => {
    let { name, email, imageurl } = req.body;
    // Use userModel.User.create to create a new user
    try {
        await userModel.User.create({
            name,
            email,
            image: imageurl,
        });
        res.redirect("/read");
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).send("Error creating user");
    }
});

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server connected to port ${PORT}`);
}).on("error", (err) => {
    console.log("Error starting the server:", err);
});
