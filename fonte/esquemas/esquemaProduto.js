const { Schema } = require('mongoose');

mongoose = require('mongoose')

const EsquemaProduto = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id_proprietario: String,
  categorias: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Categoria'
      }
  ],
  nome: String,
  descricao: String,
  valor1: Number,
  valor2: Number,
  valor3: Number,
  ativo: Boolean,
  paineis_modificacao: [
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
