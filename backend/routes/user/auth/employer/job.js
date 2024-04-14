const express = require("express");
const { prisma } = require("../../../../util/prisma");
const router = express.Router();

// Create a job
router.post("/", async (req, res) => {
  // Request body parameters
  const {
    title,
    company_name,
    location,
    compensation,
    job_description_link,
    additional_info,
    employer_id,
  } = req.body;
  try {
    // Validate input
    if (
      !(
        title &&
        company_name &&
        location &&
        compensation &&
        job_description_link &&
        additional_info &&
        employer_id
      )
    ) {
      return res.status(400).json({
        error: "All input is required",
      });
    }

    // Create a job
    const createJob = await prisma.job.create({
      data: {
        title,
        companyName: company_name,
        location,
        compensation,
        jobDescriptionLink: job_description_link,
        additionalInfo: additional_info,
        employer: {
          connect: {
            id: employer_id,
          },
        },
      },
    });

    return res.status(200).json({
      message: "Job added!",
      data: createJob,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
});

// Update a job
router.put("/:id", async (req, res) => {
  const jobId = req.params.id;
  const updatedJobData = req.body;
  try {
    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: updatedJobData,
    });
    return res.status(200).json({
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
});

// Delete a job
router.delete("/:id", async (req, res) => {
  const jobId = req.params.id;
  try {
    await prisma.job.delete({
      where: { id: jobId },
    });
    return res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
});

module.exports = router;