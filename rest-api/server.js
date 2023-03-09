import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import postRouter from "./src/controller/post-router.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/posts", postRouter);

app.listen(8080, () => {
  console.log("rest-api running on port 8080");
});
