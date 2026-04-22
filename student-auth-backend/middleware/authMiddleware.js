const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        console.log("HEADER:", authHeader); // 👈 debug

        const token = authHeader.split(" ")[1]; // 🔥 MUST

        console.log("TOKEN:", token); // 👈 debug

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT ERROR:", err.message); // 👈 IMPORTANT
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;