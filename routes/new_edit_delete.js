/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { render } = require('express/lib/response');
const router = express.Router();
const helperFunc = require('../helper/func')


router.get('/all', (req, res) => {
    res.render('all')
})

router.get('/new', (req, res) => {
    res.render('new')
})

router.post('/new', (req, res) => {
    let { passwordlength, lowercase, uppercase, specialchar, number } = req.body;
    let password = helperFunc.passwordGenerator(passwordlength, uppercase, lowercase, number, specialchar);
    res.send(password);
    // res.send(JSON.stringify(req.body));
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
