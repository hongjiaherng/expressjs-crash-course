const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const logger = require("./middleware/logger");
const members = require("./Members");

const app = express();

// Init middleware
// app.use(logger);

// Handlebars middleware
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Homepage Route
app.get("/", (req, res) =>
	res.render("index", {
		title: "Member App",
		members,
	})
);

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Member API routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
