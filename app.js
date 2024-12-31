import express from "express";

import ejs from "ejs";

const router = express.Router();

import cors from "cors";
import authrouter from "./Routes/route.js";

const app = express();

// Allow all origins (not recommended for production)
// app.use(cors());

const corsOptions = {
  origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

// or app.use(cors({ origin: '*' }));

// OR configure specific origins
app.set("view engine", "ejs");
// app.use(express.static('public'));
app.use(express.static("public"));

app.use(express.urlencoded({ extends: true }), express.json());
router.get("/home", (req, res) => {
  res.render("registration");
});

router.get("/task", (req, res) => {
  res.render("viewTask");
});
router.get("/addtask", (req, res) => {
  res.render("index");
});

router.get("/signin", (req, res) => {
  res.render("login");
});
// set template engine

// Resolve the __dirname for ES modules

app.use(authrouter);

app.use(router);

export default app;

// import axios from "axios";

// const token = "your.jwt.token";

// axios.get("http://localhost:3000/protected", {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// })
//   .then((response) => console.log(response.data))
//   .catch((error) => console.error(error.response.data));
