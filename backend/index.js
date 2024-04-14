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

// Import job routes
const job_routes = require("./routes/user/auth/employer/job");
const employer_jobs_routes = require("./routes/job/employerJobs");
const job_candidates_routes = require("./routes/job/jobCandidates");
const job_apply = require("./routes/job/apply");

// Import Auth routes
const employer_register = require("./routes/user/auth/employer/register");
const employer_login = require("./routes/user/auth/employer/login");
const employer_user = require("./routes/user/auth/employer/user");
const candidate_register = require("./routes/user/auth/candidate/register");
const candidate_login = require("./routes/user/auth/candidate/login");
const candidate_user = require("./routes/user/auth/candidate/user");
const candidate_profile = require("./routes/user/auth/candidate/profile");

// Import middleware
const auth = require("./middleware/auth");

// Register user routes
app.use("/api/user/waitlist", waitlist);
app.use("/api/user/invite", generateInvite);

// Register job route
app.use("/api/employer/job", auth, job_routes);
app.use("/api/job/employer", auth, employer_jobs_routes);
app.use("/api/job/candidates", auth, job_candidates_routes);
app.use("/api/job", auth, job_apply);

// Register Auth routes
app.use("/api/auth/employer/register", employer_register);
app.use("/api/auth/employer/login", employer_login);
app.use("/api/auth/employer/me", auth, employer_user);
app.use("/api/auth/candidate/register", candidate_register);
app.use("/api/auth/candidate/login", candidate_login);
app.use("/api/candidate/me", auth, candidate_user);
app.use("/api/candidate/profile", auth, candidate_profile);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to api.",
  });
});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
