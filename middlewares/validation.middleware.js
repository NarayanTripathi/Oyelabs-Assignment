


export const validateUserInput = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        // Simple regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "Name is required." });
        }

        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }

        next();

    } catch (error) {
        
    }
}