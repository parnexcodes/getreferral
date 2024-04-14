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

// Route to get information about a specific job
router.get("/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;

    // Retrieve the job information
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return res.status(401).json({ error: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("Error retrieving job information:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
