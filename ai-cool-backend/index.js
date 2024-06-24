const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Configuration, OpenAIApi } = require("openai");
const router = require("./routes/auth.route");
const stripe = require("stripe")(require("./config/config").stripeSecretKey);

const app = express();
require("dotenv").config();

const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB Connected to ${uri}`);
  })
  .catch((err) => {
    console.log(err.message);
  });

// Configuration for CORS
const allowedOrigins = [
  "https://aicool-three.vercel.app",
  "http://localhost:3000",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

app.use(cors(corsOptions));
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("api", process.env.OPENAI_API_KEY);
const openai = new OpenAIApi(configuration);

app.use("/api/auth", router);

app.post("/chat", (req, res) => {
  const question = req.body.question;

  openai
    .createCompletion({
      model: "gpt-3.5-turbo",
      prompt: question,
      max_tokens: 4000,
      temperature: 0,
    })
    .then((response) => {
      // console.log({ response });
      return response?.data?.choices?.[0]?.text;
    })
    .then((answer) => {
      const array = answer
        ?.split("\n")
        .filter((value) => value)
        .map((value) => value.trim());
      // console.log(array);
      return array;
    })
    .then((answer) => {
      // console.log("question", question);
      res.json({
        answer: answer,
        prompt: question,
      });
    });
});

app.post("/create-subscription", async (req, res) => {
  const { customerId, priceId } = req.body;
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
