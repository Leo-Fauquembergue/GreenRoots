// import express from "express";
import { app } from "./src/app.js";

// const app = express();
const PORT = process.env.PORT || 3001;

// app.get("/", (req, res) => {
//   res.send("Bienvenue sur l'API de GreenRoots !");
// });

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
