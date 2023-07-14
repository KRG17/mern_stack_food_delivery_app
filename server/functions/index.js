const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccountKey = require("./serviceAccountKey");

const express = require("express");
const app = express();

// cross origin 
const cors = require("cors");
app.use(cors({ origin: true }));
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
})

// Body parser for JSON data
app.use(express.json());


//firebase credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
});

// api endpoints
app.get("/",(req,res) => {
    return res.send("hello world")
})

const userRoute = require('./routes/user')
app.use("/api/users", userRoute)

const productRoute = require('./routes/products')
app.use("/api/products", productRoute)

// app.options("*", cors());

exports.app = functions.https.onRequest(app);