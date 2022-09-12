const express = require("express");
const connection = require("./Database/db");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const app = express();
const LoginRoutes = require("./Routes/LoginRoutes");
const RegisterRoutes = require("./Routes/RegisterRoutes");
const GetUsersRoutes = require("./Routes/GetUsersRoutes");
const UploadsModel = require("./Models/UploadsModel");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/login", LoginRoutes);
app.use("/register", RegisterRoutes);
app.use("/getusers", GetUsersRoutes);
app.use("/uploads", express.static("public"));

app.get("/", (req, res) => {
  res.json({ message: "Wtf-backend" });
});

app.get("/logout", (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
});

// upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).array("file");

app.post("/upload", async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    const { filename } = req.files[0];
    const { userid } = req.body;

    console.log(filename, userid);

    const file = new UploadsModel({
      userId: userid,
      filepath: filename,
    });

    const finaldata = await file.save();
    return res
      .status(200)
      .send({ message: "Files Added Successfully", files: req.files });
  });
});

app.listen(process.env.PORT || 8080, async () => {
  console.log("listening on port 8080");
  await connection;
  console.log("connected to db");
});
