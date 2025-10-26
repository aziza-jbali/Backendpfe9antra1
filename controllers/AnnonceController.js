

const User = require("../models/userSchema");
const Annonce = require("../models/Annonceschema"); 


// get delete search update add annonces 


//get all annonces
exports.getAnnonces = async (req, res) => {
  try {
    const annonces = await Annonce.find();
    res.status(200).json(annonces);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des annonces', error });
  }
};