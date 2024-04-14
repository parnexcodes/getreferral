const express = require("express");
const { prisma } = require("../../util/prisma");
const router = express.Router();

// Route to apply for a job
router.post("/apply/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const { candidateId } = req.body;

    // Check if the job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return res.status(401).json({ error: "Job not found" });
    }

    // Check if the candidate exists
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
    });

    if (!candidate) {
      return res.status(401).json({ error: "Candidate not found" });
    }

    // Check if the candidate has already applied for the job
    const existingResponse = await prisma.response.findFirst({
      where: {
        jobID: jobId,
        candidateID: candidateId,
      },
    });

    if (existingResponse) {
      return res.status(401).json({ error: "Candidate has already applied for this job" });
    }

    // Create a new response to connect the candidate to the job
    const response = await prisma.response.create({
      data: {
        job: { connect: { id: jobId } },
        candidate: { connect: { id: candidateId } },
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
      return res.status(401).json({ error: "Response not found" });
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