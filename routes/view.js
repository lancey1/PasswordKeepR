const express = require('express');
const router = express.Router();
var CryptoJS = require("crypto-js");
const { fetchWebTypes, fetchWebDetailsByWebId, fetchWebURLsByType } = require('../helper/fetchWebDetails');

router.get('/home', async (req, res) => {
    let userId = res.locals.user['id'];
    try {
        let result = await fetchWebTypes(userId);
        console.log('in /main ', result);
        if (!result) result = null;

        return res.render('home', { webtype_arr: result });
    } catch (error) {
        throw error;
    }
})

router.get('/main/:type', async (req, res) => {
    let userId = res.locals.user['id'];
    try {
        //! fetch webURLS
        const result = await fetchWebURLsByType(userId, req.params.type);
        return res.render('list_webURL', { webURL_arr: result, web_type: req.params.type });
    } catch (error) {
        throw error['message'];
    }
})

router.get('/info/:id', async (req, res) => {
    console.log('in here')
    let userId = res.locals.user['id'];
    try {
        const result = await fetchWebDetailsByWebId(userId, req.params.id);
        // return res.send(result);
        for (const item of result) {
            let bytes = CryptoJS.AES.decrypt(item['password'], process.env.SECRET_KEY);
            item['password'] = bytes.toString(CryptoJS.enc.Utf8);
        }
        
        return res.render('webURLInfo', { webinfo_arr: result });
    } catch (error) {
        throw error['message'];
    }
})

router.get('/list', (req, res) => {
    res.render('list')
})

module.exports = router;
