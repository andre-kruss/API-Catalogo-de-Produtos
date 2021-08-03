mongoose = require('mongoose')

const EsquemaProduto = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectID,
  idProprietario: String,
  idExterno: String,
  nome: String,
  descricao: String,
  linkImagem: String,
  valor1: Number,
  valor2: Number,
  valor3: Number,
  ativo: Boolean,
  categorias: [String],
  paineisModificacao: [
      {
        idExterno: String,
        nome: String,
        min: Number,
        max: Number,
        modificacoes: [
            {
              idExterno: String,
              nome: String,
              valor: Number
            }
        ]
      }
  ]
});

module.exports = mongoose.model('Produto', EsquemaProduto);
