const express = require("express");
const { prisma } = require("../../../../util/prisma");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { userid } = req.query;
    if (!userid) {
      return res.status(400).json({
        error: "All input is required",
      });
    }
    const userProfile = await prisma.employer.findFirst({
      where: {
        id: userid,
      },
    });
    if (userProfile) {
      return res.status(200).json(userProfile);
    }
    return res.status(409).json({
      message: "Invalid ID",
    });
  } catch (error) {
    console.log(error);
    return res.status(409).json(error);
  }
});

module.exports = router;
