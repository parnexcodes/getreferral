const express = require("express");
const { prisma } = require("../../../../util/prisma");
const router = express.Router();

// GET /api/candidate-profile/:userId
router.get("/api/candidate-profile/:userId", async (req, res) => {
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
app.post("/api/candidate-profile", async (req, res) => {
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

    // Upsert skills
    for (const skill of skills) {
      await prisma.skill.upsert({
        where: { name: skill.toLowerCase() },
        create: { name: skill.toLowerCase() },
        update: {},
      });
    }

    // Upsert previous companies
    for (const company of previousCompanies) {
      await prisma.company.upsert({
        where: { name: company.toLowerCase() },
        create: { name: company.toLowerCase() },
        update: {},
      });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error creating or updating candidate profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/candidate-profile
router.put("/api/candidate-profile", async (req, res) => {
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
router.delete("/api/candidate-profile", async (req, res) => {
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
