/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { render } = require('express/lib/response');
const router = express.Router();
const { passwordGenerator } = require('../helper/func');
const { storeInstance } = require('../helper/create');
var CryptoJS = require("crypto-js");


router.get('/list', (req, res) => {
    res.render('list')
})

router.get('/new', (req, res) => {
    res.render('new')
})

router.post('/new', async (req, res) => {
    let { web_type, website_url, user_email, passwordlength, lowercase, uppercase, specialchar, number } = req.body;
    let userId = res.locals.user.id;
    let password = passwordGenerator(passwordlength, uppercase, lowercase, number, specialchar);
    console.log(password);
    var ciphertext = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
    console.log(ciphertext);
    try {
        const result = await storeInstance(website_url, web_type, userId, user_email, ciphertext);
        if (result == 'success') {
            return res.render('list')
        }
    } catch (error) {
        throw error;
    }
})

router.get('/edit/:id', (req, res) => {
    res.send(req.params.id);
})

router.post('/edit/:id', (req, res) => {

})

router.post('/delete/:id', (req, res) => {
    res.send(req.params.id);
})


module.exports = router;
