import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./configs/db";

dotenv.config();

connectDB();
const port = process.env.PORT || 8003;

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});