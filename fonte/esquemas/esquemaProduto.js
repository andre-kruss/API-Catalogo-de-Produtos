mongoose = require('mongoose')

const EsquemaProduto = new mongoose.Schema({
  id: String,
  idProprietario: String,
  nome: String,
  descricao: String,
  valor1: Number,
  valor2: Number,
  valor3: Number,
  ativo: Boolean,
  categorias: [
    {
      id: String
    }
  ],
  paineisModificacao: [
      {
        id: String,
        nome: String,
        min: Number,
        max: Number,
        modificacoes: [
            {
              id: String,
              nome: String,
              valor: Number
            }
        ]
      }
  ]
});

module.exports = mongoose.model('Produto', EsquemaProduto);
