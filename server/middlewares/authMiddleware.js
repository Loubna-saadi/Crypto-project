const jwt = require("jsonwebtoken");
const jwt_secret = process.env.secret_jwt;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json("Accès refusé : Aucun token fourni");
  }

  try {
    const decoded = jwt.verify(token, jwt_secret); 
    req.user = decoded; 
    console.log(req.user)
    next(); 
  } catch (err) {
    console.error(err);
    return res.status(403).json("Token invalide ou expiré");
  }
};

module.exports = authMiddleware;
