const express = require("express");
const { prisma } = require("../../util/prisma");
const router = express.Router();

router.post("/", async (req, res) => {
  const { userid } = req.body;
  try {
    const checkInviteKey = await prisma.invites.findFirst({
      where: {
        approvedUser: {
          id: userid,
        },
      },
    });
    if (checkInviteKey) {
      return res.status(409).json({
        error: "Invite key already exists!",
      });
    }
    const generateInvite = await prisma.invites.create({
      data: {
        approvedUserID: userid,
      },
    });
    // const deleteFromWaitlist = await prisma.waitListUser.delete({
    //   where: {
    //     id: userid,
    //   },
    // });
    return res.status(200).json({
      key: generateInvite.inviteKey,
      // userid: deleteFromWaitlist.id,
      // message:
      //   "The waitlisted user has been deleted and key can only be used once.",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "error",
    });
  }
});

module.exports = router;
