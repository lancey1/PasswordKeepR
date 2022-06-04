/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { insertUser, queryUserInfoByEmail, queryInfoByUserId, queryInfoByWebTypeAndUserId } = require('../helper/queries');
const { signupCheck } = require('../helper/user')




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
  //* Validate user's inputs.
  try {
    let msg = await signupCheck(email, password, confirm_password);
    console.log(msg);
    if (msg) {
      return res.render('signup', { warning: msg, organization: organization, email:email, username:username });
    }
  } catch (error) {
    throw error['message'];
  }

  //* Hash user password then store it.
  let hashehPassword = await bcrypt.hash(password, 12);
  req.session.email = email;
  try {
    await insertUser(username, organization, email, hashehPassword);
    return res.redirect('/main');
  } catch (error) {
    throw error['message'];
  }

})

router.post('/logout', (req, res) => {
  req.session = null;
  res.render('login');
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