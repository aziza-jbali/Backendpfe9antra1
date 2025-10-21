
const VehiculesSchema = require("../models/VehiculesSchema");// first 7aja importation mta3 model

// Get all users , add user , search user,delete user , update user



exports.getVehicules = async (req, res) => {
  try {
    const vehicules = await VehiculesSchema.find();
    res.status(200).json(vehicules);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération', error });
  }
};