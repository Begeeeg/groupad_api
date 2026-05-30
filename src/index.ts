import dotenv from "dotenv";
import app from "./app";
import connectDB from "./common/db";

dotenv.config({ quiet: true });

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
