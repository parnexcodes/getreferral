const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../../../util/prisma");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password, invite_key, first_name, last_name } = req.body;

    if (!(email && password && invite_key && first_name && last_name)) {
      return res.status(400).json({
        error: "All input is required",
      });
    }

    const oldUser = await prisma.employer.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    const checkInviteKey = await prisma.invites.findFirst({
      where: {
        inviteKey: invite_key,
      },
    });

    if (!checkInviteKey) {
      return res.status(409).json({
        error: "Invalid Key!",
      });
    }

    if (oldUser) {
      return res.status(409).json({
        error: "User Already Exists. Please Login",
      });
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    if (checkInviteKey.used == true) {
      return res.status(409).json({
        error: "Invite key used already!",
      });
    }

    const user = await prisma.employer.create({
      data: {
        email: email.toLowerCase(),
        password: encryptedPassword,
        inviteKey: invite_key,
        firstName: first_name,
        lastName: last_name,
      },
    });

    const revokeInvite = await prisma.invites.update({
      where: {
        inviteKey: invite_key,
      },
      data: {
        used: true,
      },
    });

    const token = jwt.sign({ _id: user.id }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    user.token = token;
    return res.status(201).json({
      result: "Successfully registered!",
      details: {
        id: user.id,
        email: user.email,
        accessToken: token,
        role: user.role
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
