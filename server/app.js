require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sdk = require("node-appwrite");

const app = express();
const PORT = process.env.PORT || 4000;

// Init SDK
let client = new sdk.Client();

let users = new sdk.Users(client);

client
	.setEndpoint(process.env.APPWRITE_ENDPOINT) // Your API Endpoint
	.setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID
	.setKey(process.env.APPWRITE_SECRET_KEY); // Your secret API key

app.use(cors());

app.get("/", (req, res) => {
	res.status(200).json({ msg: "Hello world" });
});

app.get("/users", (req, res) => {
	let { friendIds } = req.query;

	if (!friendIds) friendIds = "";

	let promise = users.list(friendIds);
	promise.then(
		function(response) {
			res.status(200).json(response);
		},
		function(error) {
			res.status(500).json(error);
		}
	);
});

app.listen(PORT, () => {
	console.log("🚀 ~ file: app.js ~ line 27 ~ app.listen ~ PORT", PORT);
});
