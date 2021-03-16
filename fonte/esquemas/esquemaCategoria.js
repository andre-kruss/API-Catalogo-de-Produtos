mongoose = require('mongoose')

const EsquemaCategoria = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id_proprietario: String,
    nome: String
});

module.exports = mongoose.model('Categoria', EsquemaCategoria);
