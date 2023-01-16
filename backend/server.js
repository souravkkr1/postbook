const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");

const connect = require("./config/db");
const PORT = 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.post("/", (req, res) => {
  res.send("okay");
});

connect().then((res) => {
  app.listen(PORT, (err) => {
    if (err) throw err;

    console.log(`Server listening on ${PORT}`);
  });
});
