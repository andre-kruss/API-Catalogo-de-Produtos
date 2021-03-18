mongoose = require('mongoose')

const EsquemaCategoria = new mongoose.Schema({
    id: String,
    idProprietario: String,
    nome: String
});

module.exports = mongoose.model('Categoria', EsquemaCategoria);
