mongoose = require('mongoose')

const EsquemaCategoria = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    idExterno: String,
    idProprietario: String,
    nome: String
});

module.exports = mongoose.model('Categoria', EsquemaCategoria);
