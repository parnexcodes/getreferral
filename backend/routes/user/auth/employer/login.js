const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../../../util/prisma");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({
        error: "All input is required",
      });
    }

    const user = await prisma.employer.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ _id: user.id }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });

      user.accessToken = token;
      return res.status(200).json({
        result: "Successfully logged in!",
        accessToken: token,
        id: user.id,
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
      });
    }
    return res.status(400).json({
      error: "Invalid Credentials",
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    error: "Invalid request method.",
  });
});

module.exports = router;
