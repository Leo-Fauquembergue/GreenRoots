import express from "express";
import { router } from "./routers/router.js";

export const app = express();


// utiliser un body parser pour spécifier qu'on reçoit du json dans les body des requetes
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    message: "GreenRoots API is running",
  });
});

app.use(router);
