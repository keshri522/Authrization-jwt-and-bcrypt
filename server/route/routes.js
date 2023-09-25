const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = "Rahul is always rahul";
const Storedata = require("../modal/data");
router.post("/signup", async (req, res) => {
  //   console.log(req.body.formData);
  try {
    if (req.body.formData.password !== req.body.formData.confirmPassword) {
      res.status(404).send("Password not matches please check your password");
      return;
    }
    let present = await Storedata.find({ email: req.body.formData.email });
    if (present) {
      res.status(400).send("A user with this email is already present");
      return;
    }
    // making the password hasing using bcrypt
    const password = await bcrypt.hash(req.body.formData.password, 10);
    const confirmpassword = await bcrypt.hash(
      req.body.formData.confirmPassword,
      10
    );
    const datas = {
      email: req.body.formData.email,
      firstName: req.body.formData.firstName,
      lastName: req.body.formData.lastName,
      city: req.body.formData.city,
      password: password,
      confirmPassword: confirmpassword,
    };
    let records = new Storedata(datas);
    await records.save();
    res.send("Save sucessfully to database");
    // saving the data into the database
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  // checking if user is present in db or not authorization
  try {
    let user = await Storedata.find({ email: req.body.signinData.email });

    if (!user) {
      res.status(404).send("Plase login with valid credentails");
      return;
    }
    let password = await bcrypt.compare(
      req.body.signinData.password,
      user[0].password
    );
    // console.log(password);
    if (!password) {
      res.status(404).send("Plase login with valid credentails");
    } else {
      // generate a token for that login user
      const payload = {
        name: user.firstName,
        id: user._id,
        email: user.email,
      };
      const authtoken = await jwt.sign(payload, secretKey, { expiresIn: "1h" });
      res.status(200).json(authtoken);
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
