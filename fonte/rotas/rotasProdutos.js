const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Produto = require('../esquemas/esquemaProduto');

// get para /produtos
router.get('/', (req, res) => {
    Produto.find({})
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

// GET produtos por id-proprietario
router.get('/CarregarPorIdProprietario/:id_proprietario', (req, res) => {
    const id_proprietario = req.params.id_proprietario;
    Produto.findOne({id_proprietario: id_proprietario})
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

// GET categorias por id produto
router.get('/CarregarPorIdProduto/:id', (req, res) => {
    const id = req.params.id;
    Produto.findOne({_id: id})
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

// GET categorias por nome
router.get('/CarregarPorNome/:nome', (req, res) => {
    const nome = req.params.nome;
    Produto.findOne({nome: nome})
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
router.get('/ListarPorIdProprietario/:id_proprietario', (req, res) => {
    const id_proprietario = req.params.id_proprietario;
    Produto.find({id_proprietario: id_proprietario})
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

// (LISTAGEM) GET por categoria
router.get('/ListarPorCategoria/:id_proprietario/:id', (req, res) => {
    const id_proprietario = req.params.id_proprietario;
    const id = req.params.id;
    Produto.find({id_proprietario: id_proprietario, categorias: {id: id}})
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

// POST para /produtos/AdicionarProduto
router.post('/AdicionarProduto', (req, res) => {
   const produto = new Produto({
        _id: new mongoose.Types.ObjectId(),
        id_proprietario: req.body.id_proprietario,
        categorias: req.body.categorias,
        nome: req.body.nome,
        descricao: req.body.categorias,
        valor1: req.body.valor1,
        valor2: req.body.valor2,
        valor3: req.body.valor3,
        ativo: req.body.ativo,
        paineis_modificacao: req.body.paineis_modificacao,
    });

    produto
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));

    res.status(200).json({
        message: 'Produto criado'
    });
});

// DELETE por id proprietario e id produto
router.delete('/deletar/:id_proprietario/:id', (req, res) => {
    const id_proprietario = req.params.id_proprietario;
    const id = req.params.id;
    Produto.deleteOne(
        {
            id_proprietario: id_proprietario,
            id: id
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

// PUT por id_proprietario e id produto
router.put('/alterar/:id_proprietario/:id', (req, res) => {
    const id_proprietario = req.params.id_proprietario;
    const id = req.params.id; 
    const nome = req.body.nome;
    Produto.findOneAndUpdate(
        {
            id_proprietario: id_proprietario, 
            id: id
        },
        {
            nome: nome
        },
        {
            new: true
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
})

module.exports = router;