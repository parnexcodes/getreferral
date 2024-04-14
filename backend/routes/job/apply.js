const express = require("express");
const { prisma } = require("../../util/prisma");
const router = express.Router();

// Route to apply for a job
router.post("/apply/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const { candidateId, candidateProfileId } = req.body;

    // Check if the job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Check if the candidate profile exists
    const candidateProfile = await prisma.candidateProfile.findUnique({
      where: { id: candidateProfileId },
    });

    if (!candidateProfile) {
      return res.status(404).json({ error: "Candidate profile not found" });
    }

    // Apply for the job
    const response = await prisma.response.create({
      data: {
        job: { connect: { id: jobId } },
        candidateProfile: { connect: { id: candidateProfileId } },
      },
    });

    res.status(201).json(response);
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to revert job application
router.delete("/revert/:responseId", async (req, res) => {
  try {
    const { responseId } = req.params;

    // Check if the response exists
    const response = await prisma.response.findUnique({
      where: { id: responseId },
    });

    if (!response) {
      return res.status(404).json({ error: "Response not found" });
    }

    // Delete the response
    await prisma.response.delete({
      where: { id: responseId },
    });

    res.status(200).json({ message: "Application reverted successfully" });
  } catch (error) {
    console.error("Error reverting job application:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;