export const signUpController = async (req, res): Promise<void> => {
    try {
        const { username, email, password } = req.body;
    } catch (error) {
        console.error("Error in signUpController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
