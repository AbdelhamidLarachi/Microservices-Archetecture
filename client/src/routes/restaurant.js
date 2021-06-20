const express = require("express");
const router = express.Router();
const axios = require('axios')
const urlJoin = require('url-join')

const axiosRestaurant = axios.create({
    baseUrl: process.env.RESTAURANT_API_URL || 'http://apiUrl:port', // get api url from env or from hmida db
    headers: {
       // Authorization: token of api restaurant if available
      }
})

router.get('/restaurant', async (req, res) => {
    axiosRestaurant.get('/restaurant')
        .then( ({data}) => {
            console.log(data);
            res.send({ status: 200, response: data, error: null });
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
});

router.get('/restaurant/menu', async (req, res ) => {
    axiosRestaurant.get('/restaurant/menu')
        .then(({data}) => {
            console.log(data);
            res.send({ status: 200, response: data, error: null });
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
})

router.get('/restaurant/article', async (req, res ) => {
    axiosRestaurant.get('/restaurant/article')
        .then(({data}) => {
            console.log(data);
            res.send({ status: 200, response: data, error: null });
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
})
