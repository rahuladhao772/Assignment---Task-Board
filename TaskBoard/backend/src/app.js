import express from "express";
import registerModel from './model/registerModel.js'
import cors from 'cors'
const app = express();

app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send("Task Board APP");
});


app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).send({
        message: "Please enter name",
        success: false,
      })

    }
    if (!email) {
      return res.status(400).send({
        message: "Please enter email",
        success: false,
      })

    }
    if (!password) {
      return res.status(400).send({
        message: "Please enter password",
        success: false,
      })
    }

    const existingUser = await registerModel.findOne({ email })
    if (existingUser) {
      return res.status(200).send({
        message: "Email already register Please Login",
        success: false,
      })
    }
    const user = await registerModel.create({ name, email, password })
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "could not find the selected routes", error: true });
  }
});
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
        next('Please Provide All Fileds')
    }
    // find user by email
    const user = await registerModel.findOne({ email })
    if (!user) {
      return res.status(400).send({
        message: "Email is not registed please login",
        success: false,
      })
    }
    //compare password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).send({
        message: "Wrong password",
        success: false,
      })
    }

    user.password = "****"
    res.status(201).send({
        message: "Login Successfully ",
        success: true,
        user,
    })

  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "could not find the selected routes", error: true });
  }
});

export default app;