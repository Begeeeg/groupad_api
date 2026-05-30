import dotenv from "dotenv";
import app from "./app";

dotenv.config({ quiet: true });

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
