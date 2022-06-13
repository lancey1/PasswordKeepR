const express = require('express');
const router = express.Router();
const { passwordGenerator } = require('../helper/func');
const { storeInstance } = require('../helper/create');
const { alterWebUserPswd, deleteWebPswdById } = require('../helper/queries')
const { protectAuthRoutes } = require('../helper/protectRoutes');
var CryptoJS = require("crypto-js");

router.get('/new', protectAuthRoutes, (req, res) => {
  res.render('new')
})

router.post('/new', protectAuthRoutes, async (req, res) => {
  let { web_type, website_url, user_email, user_password, passwordlength, lowercase, uppercase, specialchar, number, createpassword } = req.body;
  let userId = res.locals.user.id;
  let password;

  if (createpassword === undefined ) {
    password = user_password;
  } else {
    password = passwordGenerator(passwordlength, uppercase, lowercase, number, specialchar);
  }

  var ciphertext = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();

  try {
    const result = await storeInstance(website_url, web_type, userId, user_email, ciphertext);
    if (result == 'success') {
      return res.redirect('list');
    }
  } catch (error) {
    throw error;
  }
})

router.get('/edit/:id', protectAuthRoutes, (req, res) => {
  // return res.redirect('/home');
})

router.post('/edit/:id', protectAuthRoutes, async (req, res) => {
  const { newpassword, website_id } = req.body;
  const user_id = res.locals.user['id'];
  const website_password_id = req.params.id;
  //? Encrypt user new password
  var ciphertext = CryptoJS.AES.encrypt(newpassword, process.env.SECRET_KEY).toString();
  try {
    await alterWebUserPswd(ciphertext, website_password_id, user_id);
    return res.redirect(`/info/${website_id}`);
  } catch (error) {
    throw error['message'];
  }

})

router.post('/delete/:id', protectAuthRoutes, async (req, res) => {
  try {
    await deleteWebPswdById(req.params.id);
    return res.redirect(`/info/${req.body['website_id']}`);
  } catch (error) {
    throw error;
  }
})

module.exports = router;