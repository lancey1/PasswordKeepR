const express = require('express');
const router = express.Router();
const { fetchWebTypes } = require('../helper/fetchWebDetails');

router.get('/main', async (req, res) => {
    let userId = res.locals.user['id'];
    try {
        let result = await fetchWebTypes(userId);
        console.log(result, ' in /main');
        if (!result) result = null;

        return res.render('main', { webtype_arr: result });
    } catch (error) {
        throw error;
    }
})

router.get('/main/:type', async (req, res) => {
    res.send(req.params.type);
})

module.exports = router;