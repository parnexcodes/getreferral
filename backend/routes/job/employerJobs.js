const express = require("express");
const { prisma } = require("../../util/prisma");
const router = express.Router();

router.get("/", async (req, res) => {
  const { id } = req.query;
  try {
    const jobsOfEmployer = await prisma.employer.findFirst({
      where: {
        id: id,
      },
      include: {
        job: true,
      },
    });
    return res.status(200).json(jobsOfEmployer);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
});

module.exports = router;
