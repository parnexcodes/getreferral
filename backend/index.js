require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Import user routes
const waitlist = require("./routes/user/waitlist");
const generateInvite = require("./routes/user/generate_invite");

// Import Auth routes
const employer_register = require("./routes/user/auth/employer/register");
const employer_login = require("./routes/user/auth/employer/login");
const candidate_register = require("./routes/user/auth/candidate/register");
const candidate_login = require("./routes/user/auth/candidate/login");

// Register user routes
app.use("/api/user/waitlist", waitlist);
app.use("/api/user/invite", generateInvite);

// Register Auth routes
app.use("/api/auth/employer/register", employer_register);
app.use("/api/auth/employer/login", employer_login);
app.use("/api/auth/candidate/register", candidate_register);
app.use("/api/auth/candidate/login", candidate_login);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to api.",
  });
});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
