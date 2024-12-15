const jwt = require('jsonwebtoken')
const Athletes = require("../models/athlete_model")




const checkToken = async (req,res,next) =>{

    if(!req.headers["authorization"]){
        return res.json({msg:"debe incluir el token"})
    }
    const token = req.headers['authorization']


    let data;
    try{ 
        const tokenVe = token.split(' ')[1];
        data = jwt.verify(tokenVe, process.env.SECRET_KEY_JWT);

    }catch(error){
        return res.josn({msg:'el token es incorrecto'})

    }

    const user = await Athletes.findById(data.user_id)

    if(!user){
        return res.json({msg:'el usuario no existe'});
    }

    req.user = user;
    next()
};





const authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "No tienes permisos para realizar esta acción." });
    }
    next();
};

module.exports = {checkToken,authorize};

