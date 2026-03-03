import express from "express"
import { connectDB } from "./config/database.js"
import { CONFIG } from "./config/config.js"

const PORT = CONFIG.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB(CONFIG.MONGO_URI, CONFIG.DB_NAME);

app.get("/", (req, res) => {
    res.setHeader("content-Type", "text/plain");
    res.status(200).send("OK");
})

app.listen(CONFIG.PORT, () => {
    console.log(`Server listening on port: ${CONFIG.PORT}`)
})