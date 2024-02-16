const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../../../util/prisma");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    if (!(email && password && first_name && last_name)) {
      return res.status(400).json({
        error: "All input is required",
      });
    }

    const oldUser = await prisma.candidate.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (oldUser) {
      return res.status(409).json({
        error: "User Already Exists. Please Login",
      });
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.candidate.create({
      data: {
        email: email.toLowerCase(),
        password: encryptedPassword,
        firstName: first_name,
        lastName: last_name,
      },
    });

    const token = jwt.sign({ _id: user.id }, process.env.TOKEN_KEY, {
      expiresIn: "7d",
    });

    user.token = token;
    return res.status(201).json({
      result: "Successfully registered!",
      details: {
        id: user.id,
        email: user.email,
        accessToken: token,
      },
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
