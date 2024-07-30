const express = require("express");
const cors = require("cors");
const User = require("./models/user.js");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const Place = require("./models/Place.js");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const app = express();
app.use(express.json());
const RegisterRoute = require("./routes/RegisterRoute.js");
const Profile = require("./routes/Profile.js");
const Login = require("./routes/Login.js");
const deleteRoute = require("./routes/deleteRoute");
const PlacesRoute = require("./routes/Places.js");
const middleware = require("./middlewares.js");
const PlaceById = require("./routes/PlaceById.js");
const LogoutRoute = require("./routes/LogoutRoute.js");
const UserPlaces = require("./routes/UserPlaces.js");
const UpdatePlacesRoute = require("./routes/UpdatePlacesRoute.js");
const Booking = require("./models/Booking.js");
// middleware(app);
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "https://airbnb-clone-frontend-khaki.vercel.app",
  })
);
app.use(cookieParser());
mongoose.connect(
  "mongodb+srv://mernlearn:VuFIdDFpn3iAmsK0@cluster0.ex40eey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const salt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret";

app.get("/test", (req, res) => {
  res.json("hello world");
});
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];

  try {
    
    for (let i = 0; i < req.files.length; i++) {
      const { path: tempPath, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = `${tempPath}.${ext}`;
      console.log(newPath);
      console.log(tempPath);
      fs.renameSync(tempPath, newPath);
      uploadedFiles.push(newPath.replace("uploads\\", ""));
    }
    console.log(uploadedFiles);
    res.json(uploadedFiles);
  } catch (err) {
    console.error("Error uploading files:", err);
    res.status(500).json({ error: "Failed to upload files" });
  }
});
app.put("/places", UpdatePlacesRoute);
app.get("/user-places", UserPlaces);
app.delete("/delete", deleteRoute);
app.get("/places/:id", PlaceById);
app.post("/places", PlacesRoute);
app.get("/profile", Profile);
app.post("/register", RegisterRoute);
app.post("/login", Login);
app.post("/logout", LogoutRoute);
app.get("/places", async (req, res) => {
  res.json(await Place.find({}));
});
function getUserDataFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, async (err, userData) => {
      if (err) {
        reject(err); // Use reject to properly handle errors in a Promise
      } else {
        resolve(userData);
      }
    });
  });
}
app.post("/bookings", async (req, res) => {
  const userData= await getUserDataFromToken(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  Booking.create({
    place,
    user: userData.id,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
  }).then(( doc) => {
    res.json(doc);
  }).catch((err) => {
    throw err;
  });

});


app.get("/bookings",async (req,res) =>{
  const userData= await getUserDataFromToken(req);
  res.json(await Booking.find({user: userData.id}).populate('place'));
})

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
