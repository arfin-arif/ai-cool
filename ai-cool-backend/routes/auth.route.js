const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  verifyEmail,
  editUser,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/edit-user/:email", editUser);
router.get("/all-users", getAllUsers);
router.put("/verify-email/:userId", verifyEmail);
router.delete("/delete-user/:userId", deleteUser);

module.exports = router;
