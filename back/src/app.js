import express from "express";
import { router } from "./routers/router.js";
import { errorHandler } from "./middlewares/errorHandler.js"


export const app = express();

// Utiliser un body parser pour spécifier qu'on reçoit du json dans les body des requêtes
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    message: "GreenRoots API is running",
  });
});

app.use(router);

// Middleware gestion d'erreur
app.use(errorHandler);
