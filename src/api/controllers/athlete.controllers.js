const bcrypt = require("bcryptjs")
const Athletes = require('../models/athlete_model');
const {createToken} = require("../../utils/jwt")




const register = async (req, res) => {
    try {
        const newAthlete = req.body;

        
        const athleteDB = await Athletes.findOne({ email: newAthlete.email });
        if (athleteDB) {
            return res.status(400).json({ message: "El email ya está registrado" });
        }

        newAthlete.password = await bcrypt.hash(newAthlete.password, 10);

        
        const atleta = await Athletes.create(newAthlete);
        return res.status(201).json({
            message: "Registro exitoso",
            athlete: atleta,
        });
    } catch (error) {
        console.error("Error en el registro:", error.message);
        return res.status(500).json({ message: "Error al registrar al atleta", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const athleteDB = await Athletes.findOne({ email });
        if (!athleteDB) {
            return res.status(404).json({ message: "El email no existe" });
        }

        
        const isMatch = await bcrypt.compare(password, athleteDB.password);
        if (!isMatch) {
            return res.status(401).json({ message: "La contraseña es incorrecta" });
        }

        
        const token = createToken(athleteDB);

        return res.status(200).json({
            message: "Login exitoso",
            token,
        });
    } catch (error) {
        console.error("Error en el login:", error.message);
        return res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        
        const dataAthlete = await Athletes.findById(req.user.id);
        if (!dataAthlete) {
            return res.status(404).json({ message: "Perfil no encontrado" });
        }

        return res.status(200).json({
            message: "Perfil obtenido correctamente",
            athlete: dataAthlete,
        });
    } catch (error) {
        console.error("Error al obtener el perfil:", error.message);
        return res.status(500).json({ message: "Error al obtener el perfil", error: error.message });
    }
};



    module.exports= {register,login,getProfile}