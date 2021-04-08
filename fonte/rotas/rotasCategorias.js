const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const Categoria = require('../esquemas/esquemaCategoria');

// GET para /categorias
router.get('/', (req, res) => {
    res.status(300).json({
        message: "It works!"
    });
});

// GET categorias 
router.get('/carregar/:idProprietario/:id', (req, res) => {
    const idProprietario = req.params.idProprietario;
    const id = req.params.id;
    Categoria.findOne({idProprietario: idProprietario, _id: id})
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
    Categoria.find({idProprietario: idProprietario})
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

// POST para /categorias/AdicionarCategoria
router.post('/adicionar', (req, res) => {

    const categoria = new Categoria({
        _id: mongoose.Types.ObjectId(),
        idProprietario: req.body.idProprietario,
        nome: req.body.nome
    });

    categoria
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });  
});

// DELETE por id proprietario e id categoria
router.delete('/deletar/:idProprietario/:id', (req, res) => {
    const idProprietario = req.params.idProprietario;
    const id = req.params.id;
    Categoria.deleteOne(
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

// PATCH por id_proprietario e id categoria
router.patch('/alterar/:idProprietario/:id', (req, res) => {
    const idProprietario = req.params.idProprietario;
    const id = req.params.id; 
    const nome = req.body.nome;
    Categoria.update({idProprietario: idProprietario, _id: id}, { $set: {nome: nome}})
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