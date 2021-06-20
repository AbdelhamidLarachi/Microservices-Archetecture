const express = require("express");
const router = express.Router();
const Client = require('../controllers/client')

router.get('/client/getMe', async (req, res) => {
    Client.get(req.query.id)
        .then(result => {
            res.send({ status: 200, response: result, error: null });
        })
        .catch(err => {
            res.send(err);
        })
});
router.post('/client/register', async (req, res) => {
    Client.register(req.body.credentialsId, req.body)
        .then(result => {
            res.send({ status: 200, response: result, error: null });
        })
        .catch(err => {
            res.send(err);
        })
});
router.post('/client/login', async (req, res) => {
    Client.get(req.body.id)
        .then(result => {
            res.send({ status: 200, response: result, error: null });
        })
        .catch(err => {
            res.send(err);
        })
});
router.put('/client/update', async (req, res) => {
    Client.update(req.body.credentialId, req.body)
        .then(result => {
            res.send({ status: 200, response: result, error: null });
        })
        .catch(err => {
            res.send(err);
        })
});
router.delete('/client/remove', async (req, res) => {
    Client.remove(req.body.id)
        .then(result => {
            res.send({ status: 200, response: result, error: null });
        })
        .catch(err => {
            res.send(err);
        })
});
