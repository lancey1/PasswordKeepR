/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { insertUser, queryInfoByUserId, queryInfoByWebTypeAndUserId } = require('../helper/queries');




router.get('/login', (req, res) => {
  res.render('login');
})

router.post('/login', (req, res) => {

  res.send(JSON.stringify(req.body));
})

router.get('/signup', (req, res) => {
  res.render('signup');
})

router.post('/signup', async (req, res) => {
  const { organization, username, email, password, confirm_password } = req.body;
  //todo Validate user's input, such as password_confirm and if email exisits.

  //* Hash user password then store it.
  let hashehPassword = await bcrypt.hash(password, 12);
  try {
    await insertUser(username, organization, email, hashehPassword);
    return res.redirect('/main');
  } catch (error) {
    throw error['message'];
  }

})

router.post('/logout', (req, res) => {

})

router.get('/main', async (req, res) => {
  // try {
  //   const result = await queryInfoByUserId(2);
  //   res.send(result);
  // } catch (error) {

  //   throw error['message'];
  // }
  res.render('main');
})


module.exports = router;