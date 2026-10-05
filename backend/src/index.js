// package imports 
import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./libs/connectDB.js";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import { createServer } from "http";
import cron from "node-cron";
import fs from "fs";

import { initializeSocket } from "./libs/socket.js";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";


dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;
const __dirname = path.resolve();

const server = createServer(app);
initializeSocket(server);

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());  // to parse incoming requests with JSON payloads (req.body)
app.use(clerkMiddleware()); // this will add auth to req obj — call req.auth() to get { userId, sessionId }
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
}));


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

const tempDir = path.join(process.cwd(),"temp");
// cron jobs => delete temp files
cron.schedule("0 * * * *", () => {
    if (fs.existsSync(tempDir)) {
        fs.readdir(tempDir, (err, files) => {
            if (err) {
                console.log("error", err);
                return;
            }
            for (const file of files) {
                fs.unlink(path.join(tempDir, file), (err) => {});
            }
        });
    }
})


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("/{*splat}", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
        // res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    });
}

// error handler
app.use((err, req, res, next) => {
    res.status(500).json({message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message });
});

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
  connectDB();
});


