const express = require("express");
const cors = require("cors");
const xml = require("xml");
const xmlParser = require("express-xml-bodyparser");

const app = express();

app.use(xmlParser());
app.use(cors());
app.use(express.json());

const data = {
	user: [
		{
			name: "christine",
		},
		{
			age: 21,
		},
	],
};

app.get("/xml", (req, res) => {
	res.set("Content-Type", "text/xml");
	if (req.query.type === "xml") {
		return res.send(xml(data));
	}

	return res.json(data);
});

app.post("/post", (req, res) => {
	data.user.push(req.body);

	res.set("Content-Type", "text/xml");
	console.log("data", data);
	return res.send(xml(data));
});

app.listen(3000, () => {
	console.log("server running");
});
