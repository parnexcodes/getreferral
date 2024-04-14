const express = require("express");
const { prisma } = require("../../../../util/prisma");
const router = express.Router();

// GET /api/candidate-profile/:userId
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Retrieve candidate profile
    const profile = await prisma.candidateProfile.findUnique({
      where: { candidateID: userId },
      include: {
        candidate: true,
        skills: true,
        previousCompanies: true,
      },
    });

    if (!profile) {
      return res.status(404).json({ error: "Candidate profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error retrieving candidate profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/candidate-profile
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      totalExp,
      currentCompany,
      city,
      skills,
      previousCompanies,
    } = req.body;

    // Ensure candidate profile exists
    const existingProfile = await prisma.candidateProfile.findUnique({
      where: { candidateID: userId },
    });

    if (existingProfile) {
      return res
        .status(400)
        .json({ error: "Candidate profile already exists" });
    }

    // Create or update candidate profile
    const profile = await prisma.candidateProfile.upsert({
      where: { candidateID: userId },
      update: {
        totalExp,
        currentCompany,
        city,
      },
      create: {
        totalExp,
        currentCompany,
        city,
        candidate: { connect: { id: userId } },
      },
      include: {
        skills: true,
        previousCompanies: true,
      },
    });

    // Upsert skills and connect them to the profile
    for (const skill of skills) {
      const existingSkill = await prisma.skill.findFirst({
        where: { name: skill.toLowerCase() },
      });

      if (existingSkill) {
        await prisma.candidateSkill.create({
          data: {
            skill: { connect: { id: existingSkill.id } },
            candidateProfile: { connect: { candidateID: userId } },
          },
        });
      } else {
        const createdSkill = await prisma.skill.create({
          data: { name: skill.toLowerCase() },
        });
        await prisma.candidateSkill.create({
          data: {
            skill: { connect: { id: createdSkill.id } },
            candidateProfile: { connect: { candidateID: userId } },
          },
        });
      }
    }

    // Upsert previous companies and connect them to the profile
    for (const company of previousCompanies) {
      const existingCompany = await prisma.company.findFirst({
        where: { name: company.toLowerCase() },
      });

      if (existingCompany) {
        await prisma.candidateCompany.create({
          data: {
            company: { connect: { id: existingCompany.id } },
            candidateProfile: { connect: { candidateID: userId } },
          },
        });
      } else {
        const createdCompany = await prisma.company.create({
          data: { name: company.toLowerCase() },
        });
        await prisma.candidateCompany.create({
          data: {
            company: { connect: { id: createdCompany.id } },
            candidateProfile: { connect: { candidateID: userId } },
          },
        });
      }
    }

    // Retrieve the profile with skills and previous companies including their names
    const updatedProfile = await prisma.candidateProfile.findUnique({
      where: { candidateID: userId },
      include: {
        skills: {
          select: {
            skill: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        previousCompanies: {
          select: {
            company: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    res.json(updatedProfile); // Return the updated profile including skills and previous companies
  } catch (error) {
    console.error("Error creating or updating candidate profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/candidate-profile
router.put("/", async (req, res) => {
  try {
    const {
      userId,
      totalExp,
      currentCompany,
      city,
      skills,
      previousCompanies,
    } = req.body;

    // Update candidate profile
    const profile = await prisma.candidateProfile.update({
      where: { candidateID: userId },
      data: {
        totalExp,
        currentCompany,
        city,
        skills: { set: skills.map((skill) => skill.toLowerCase()) },
        previousCompanies: {
          set: previousCompanies.map((company) => company.toLowerCase()),
        },
      },
    });

    res.json(profile);
  } catch (error) {
    console.error("Error updating candidate profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/candidate-profile
router.delete("/", async (req, res) => {
  try {
    const { userId } = req.body;

    // Delete candidate profile
    await prisma.candidateProfile.delete({
      where: { candidateID: userId },
    });

    res.json({ message: "Candidate profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting candidate profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
