import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// API routes
import apiRoutes from "./routes/api.js";
app.use("/api", apiRoutes);

// Serve frontend after build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../gwoc/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../gwoc/dist/index.html"));
});

// Use PORT provided by Vercel
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
