const express = require("express");
const { prisma } = require("../../util/prisma");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, linkedinURL } = req.body;
  try {
    if (!(email && linkedinURL)) {
      return res.status(400).json({
        error: "All input is required",
      });
    }

    const checkWaitList = await prisma.waitListUser.findUnique({
      where: {
        email: email,
      },
    });
    if (checkWaitList) {
      return res.status(400).json({
        message:
          "Already waitlisted, please check your mail for further process.",
        id: checkWaitList.id,
      });
    }
    const addToWaitList = await prisma.waitListUser.create({
      data: {
        email: email,
        linkedinURL: linkedinURL,
      },
    });
    return res.status(200).json({
      message: "Added to waitlisting!",
      data: addToWaitList,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
});

module.exports = router;
