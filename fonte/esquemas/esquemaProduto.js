mongoose = require('mongoose')

const EsquemaProduto = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectID,
  idProprietario: String,
  nome: String,
  descricao: String,
  valor1: Number,
  valor2: Number,
  valor3: Number,
  ativo: Boolean,
  categorias: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Categoria'
    }
  ],
  paineisModificacao: [
      {
        nome: String,
        min: Number,
        max: Number,
        modificacoes: [
            {
              nome: String,
              valor: Number
            }
        ]
      }
  ]
});

module.exports = mongoose.model('Produto', EsquemaProduto);
