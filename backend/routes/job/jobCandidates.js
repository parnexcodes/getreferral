const express = require("express");
const { prisma } = require("../../util/prisma");
const router = express.Router();

// Route to list users connected to a specific job ID
router.get("/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;

    // Retrieve responses for the specific job ID along with the associated candidate profiles
    const responses = await prisma.response.findMany({
      where: { jobID: jobId },
      include: {
        candidate: {
          include: {
            candidateProfile: {
              include: {
                previousCompanies: {
                  include: {
                    company: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
                skills: {
                  include: {
                    skill: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!responses || responses.length === 0) {
      return res.status(401).json({ error: "No users found for this job" });
    }

    res.status(200).json(responses);
  } catch (error) {
    console.error("Error retrieving users for job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
