//JUST WANTEED TO MAINTAIN ONLY A SINGLE BACKEND FILE COZ I CAN'T MANAGE STAFF
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
//mongoose
const mongoose = require("mongoose");
const User = require("../server/models/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000" ,
    methods: ["POST", "GET", "DELETE", "PUT"] ,
    allowedHeaders: ["Content-Type"] ,
  })
);

mongoose
  .connect(
    // "mongodb+srv://admin:admin@cluster0.mongodb.net/passwordManager",
    "mongodb+srv://sai:1234@cluster0.8o33kdd.mongodb.net/passwordManager?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  ) //running locally
  .then(() => {
    console.log("MongoDB: Connected to database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
//                             -------------------LOGIN --------------------
app.get("/login", (req, res) => {
  res.send("ok login");
});
var UserID = "";

app.post("/login", async (req, res) => {
  const { userName, userPassword } = req.body;

  await User.findOne({ userName: userName })
    .then((user) => {
      if (user) {
        if (user.userPassword === userPassword) {
          res.send(user._id);
          UserID = user._id;
        } else {
          res.send("WRONG");
        }
      } else {
        res.send("404");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//                                -----------------REGISTER-----------------

app.post("/register", (req, res) => {
  // Assuming your data has a title and content field
  // const {userName , userEmail, userPassword} = req.body;
  User.findOne({ userName: req.body.userName }).then((user) => {
    if (!user) {
      User.create({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPassword: req.body.userPassword,
        userSites: [],
      });
      res.send("GOOD");
    } else {
      res.send("ALREADY_EXISTS");
    }
  });
});

//                                 -------------PASSWORDS-----------------
app.get("/passwords", async (req, res) => {
  await User.findById(UserID)
    .then((user) => {
      if (user) {
        return res.status(200).json({
          loggedin: true,
          sites: user.userSites,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
//creating new site details
app.post("/passwords", async (req, res) => {
  const { url, username, password } = req.body;

  await User.findById(UserID).then((user) => {
    if (user) {
      // adding the new site details using splice
      user.userSites.splice(-0, 0, {
        siteURL: url,
        siteUsrName: username,
        sitePassword: password,
      });
      // Save the updated user document
      user.save().then((saveErr) => {
        console.log("site addded to database");
      });
    }
    res.send("Success");
  });
});

// deletion of any data
app.delete("/passwords/:id", async (req, res) => {
  await User.findById(UserID).then((user) => {
    if (user) {
      const siteIndex = user.userSites.findIndex(
        (site) => site._id.toString() === req.params.id
      );

      if (siteIndex !== -1) {
        // Remove the comment from the array
        user.userSites.splice(siteIndex, 1);

        // Save the updated user document
        user.save().then((saveErr) => {
          if (saveErr) {
            console.error(saveErr);
          }
          console.log("Site deleted:", req.params.id);
        });
      } else {
        console.log("Comment not found.");
      }
    }
  });
});

app.post("/logout", (res, req) => {
  UserID = "";
});
