const { authMiddleware } = require("./authMiddleware");

const adminMiddleware = (req, res, next) => {
    if (!req.user) { //si l'utilisateur n'est pas connecté
        return res.status(401).json({
             success: false,
              message: "Unauthorized access please provide a valid token" });
    }
    //si l'utilisateur n'est pas admin
    if (req.user.userType !== "admin") {
        return res.status(403).json({ 
            success: false, 
            message: "Access denied: Admins only" });
    }
    //si l'utilisateur est admin
    next();
};

module.exports = { adminMiddleware };
