const {Users}=require("../models/Users")
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")
const jwt_secret=process.env.secret_jwt
const Register =async(req,res)=>{
    try{
        if(!req.body){
            return res.status().json("Le body de la requete est vide")
        }
        const {email,username,password}=req.body
        const hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword);
        const newUser = await new Users({email,username,password:hashedPassword}).save();
        console.log("New user is added ")
        return res.status(200).json(newUser)
    }catch(err){
        console.error(err)
        return res.status(500).json("erreur interne du serveur");
    }
}

const Login=async(req,res)=>{
      try{
        if(!req.body){
            return res.status().json("Le body de la requete est vide")
        }
        const {email,password}=req.body
        const emailFound= await Users.findOne({email});
        if(!emailFound){
            return res.status(404).json("aucun compte n'est associé à cet email")
        }
        const hashedPassword=emailFound.password
        const matchedPassword= await bcrypt.compare(password,hashedPassword);
        if(!matchedPassword){
            return res.status(404).json("mot de passe incorrecte")
        }
        const token = jwt.sign(
            { 
              id: emailFound._id, 
              email: emailFound.email, 
              username: emailFound.username 
            },
            jwt_secret,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            message: "Connexion réussie",
            token: token,
          });
      }catch(err){
        console.error(err)
        return res.status(500).json("erreur interne du serveur")
      }
}

const HomePage = (req, res) => {
    try {
      const { username } = req.user; 
      return res.status(200).json({
        message: `Bienvenue sur votre page d'accueil, ${username}!`,
        user: req.user, 
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json("Erreur interne du serveur");
    }
  };
module.exports={Register,Login,HomePage}