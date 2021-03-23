const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Produto = require('../esquemas/esquemaProduto');

// get para /produtos
router.get('/', (req, res) => {
    res.status(300).json({
        message: "It works!"
    });
});

// GET produtos por id-proprietario
router.get('/carregar/:idProprietario/:id', (req, res) => {
    const idProprietario = req.params.idProprietario;
    const id = req.params.id;
    Produto.findOne({idProprietario: idProprietario, _id: id})
        .exec()
        .then(doc => {
            console.log("Do banco de dados:", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// (LISTAGEM) GET por id-proprietario
router.get('/listar/:idProprietario', (req, res) => {
    const idProprietario = req.params.idProprietario;
    Produto.find({idProprietario: idProprietario})
        .exec()
        .then(doc => {
            console.log("Do banco de dados:", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// POST para /produtos/adicionar
router.post('/adicionar', (req, res) => {
   const produto = new Produto({
        _id: mongoose.Types.ObjectId(),
        idProprietario: req.body.idProprietario,
        nome: req.body.nome,
        descricao: req.body.descricao,
        valor1: req.body.valor1,
        valor2: req.body.valor2,
        valor3: req.body.valor3,
        ativo: req.body.ativo,
        categorias: req.body.categorias,
        paineisModificacao: req.body.paineisModificacao
    });

    produto
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

// DELETE por id proprietario e id produto
router.delete('/deletar/:idProprietario/:id', (req, res) => {
    const idProprietario = req.params.idProprietario;
    const id = req.params.id;
    Produto.deleteOne(
        {
            idProprietario: idProprietario,
            _id: id
        }
    )
    .exec()
        .then(doc => {
            console.log("Do banco de dados:", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// UPDATE por id_proprietario e id produto
router.patch('/alterar/:idProprietario/:id', (req, res) => {
    const idProprietario = req.params.idProprietario;
    const id = req.params.id; 
    const alteracoes = {};

    for(const [chave, valor] of Object.entries(req.body)){
        alteracoes[chave] = valor;
    }

    Produto.update({idProprietario: idProprietario, _id: id}, { $set: alteracoes})
    .exec()
        .then(doc => {
            console.log("Do banco de dados:", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
})

module.exports = router;