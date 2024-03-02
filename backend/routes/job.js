const express = require("express");
const { prisma } = require("../util/prisma");
const router = express.Router();

router.post("/", async (req, res) => {
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

    const createJob = await prisma.job.create({
      data: {
        title: title,
        companyName: company_name,
        location: location,
        compensation: compensation,
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

router.get("/", async (req, res) => {
  const { id } = req.query;
  try {
    const getJob = await prisma.job.findFirst({
      where: {
        id: id,
      },
    });
    return res.status(200).json(getJob);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
});

router.get("/employer", async (req, res) => {
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
