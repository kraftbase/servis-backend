const express = require('express')
const {check,validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyToken = require('../controllers/middleware')
const userEntity = require('../entities/userEntity')

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is Required").isEmail(),
    check("password", "Password is required").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
     return res.status(400).json({ message: errors.array() });
    }
    const { email, password } = req.body;
    const isProduction = process.env.NODE_ENV === "production"
    try {
      const user = await userEntity.findOne({
        where:{email:email}
      });
      if (!user) {
       return res.status(404).json({ message: "Invalid Credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(404).json({ message: "Invalid Credentials" });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECERET_KEY, {
        expiresIn: "1d",
      });
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: isProduction,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: isProduction ? "None":"Lax",
      });
      return res.status(200).json({userId:user.userId});
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

router.get('/verify-token',verifyToken,(req,res)=>{
  res.status(200).send({userId:req.userId})
})

router.post('/logout',async(req,res)=>{
  res.cookie('auth_token',"",{
    expires: new Date(0)
  })
  res.send()
})

module.exports= router;
