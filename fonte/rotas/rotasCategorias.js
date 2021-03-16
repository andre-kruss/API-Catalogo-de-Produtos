const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Categoria = require('../esquemas/esquemaCategoria');

// GET para /categorias
router.get('/', (req, res) => {
    Categoria.find({})
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

// GET categorias por id-proprietario
router.get('/CarregarPorIdProprietario/:id_proprietario', (req, res) => {
    const id_proprietario = req.params.id_proprietario;
    Categoria.findOne({id_proprietario: id_proprietario})
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

// GET categorias por id categoria
router.get('/CarregarPorIdCategoria/:id', (req, res) => {
    const id = req.params.id;
    Categoria.findOne({_id: id})
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
    Categoria.findOne({nome: nome})
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
    Categoria.find({id_proprietario: id_proprietario})
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
router.post('/AdicionarCategoria', (req, res) => {
   const categoria = new Categoria({
        _id: new mongoose.Types.ObjectId(),
        id_proprietario: req.body.id_proprietario,
        nome: req.body.nome
    });

    categoria
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));

    res.status(200).json({
        message: 'Categoria criada'
    });
});

// DELETE por id proprietario e id categoria
router.delete('/deletar/:id_proprietario/:id', (req, res) => {
    const id_proprietario = req.params.id_proprietario;
    const id = req.params.id;
    Categoria.deleteOne(
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

// PUT por id_proprietario e id categoria
router.put('/alterar/:id_proprietario/:id', (req, res) => {
    const id_proprietario = req.params.id_proprietario;
    const id = req.params.id; 
    const nome = req.body.nome;
    Categoria.findOneAndUpdate(
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