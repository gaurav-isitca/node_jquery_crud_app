var express = require('express');
var router = express.Router();
var db = require('../db/db');
var session = require('express-session');

router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// router.use(function (req, res, next) {
//   res.locals.currentUser = req.username;
//   });


/* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Node CRUD App' });
// });

// Register
// router.post('/register', (req, res) => {
//   const user = req.body.username;
//   let sqlQuery = "SELECT 1 FROM users WHERE username = '"+user+"' ORDER BY username LIMIT 1";
//   db.query(sqlQuery, function(error, results){
// 	// There was an issue with the query
// 	if(error){
//     if (error) throw error;
// 		res.redirect('/')
// 	}
// 	if(results.length){
//     res.send('Username already exists')
// 	}else{
//     let pwd = bcrypt.hashSync(req.body.password, 10);
//     let data = {username : req.body.username, password : pwd};
//     let sql = 'INSERT INTO users SET ?';
//     let query = db.query(sql, data, (err, results) => {
//         res.redirect('/');
//     });
// 	}
// });
// });

// // Login
// router.post('/login', function(request, response) {
// 	let username = request.body.username_login;
//   let password = request.body.password_login;
// 	if (username && password) {
// 		db.query('SELECT * FROM users WHERE username = ?', [username], function(error, results, fields) {
//       if(bcrypt.compareSync(request.body.password_login, results[0].password)) {
//         request.session.loggedin = true;
//         request.session.username = username;
// 				response.redirect('/home');
// 			} else {
// 				response.send('Incorrect Username and/or Password!');
// 			}			
// 			response.end();
// 		});
// 	} else {
// 		response.send('Please enter Username and Password!');
// 		response.end();
// 	}
// });

// // Logout

// router.get("/logout", (req, res) => {
//   req.session.loggedin = false;
//   res.redirect('/')
//   });

// Home Page

router.get('/', (req, res) => {
  res.render('index')
});

router.post('/home', (req, res) => {
  let sql = 'SELECT * FROM contacts';
  let query = db.query(sql,(err, rows) => {
    res.send({user:rows});
  });
});

router.post('/save', (req, res) => {
  let data = {first_name : req.body.first_name, middle_name : req.body.middle_name, last_name : req.body.last_name, contact_number : req.body.phone};
  let sql = 'INSERT INTO contacts SET ?';
  let query = db.query(sql, data, (err, results) => {
      res.redirect('/home');
  });
});

router.post('/edit', (req, res) => {
  const userId = req.body.editid;
  let sql = `SELECT * FROM contacts WHERE sno = ${userId}`;
  let query = db.query(sql,(err, result) => {
      res.json({user : result[0]});
  }); 
});

router.post('/update', (req, res) => {
  const userId = req.body.userid;
  let sql = "update contacts SET first_name='"+req.body.first_name+"', middle_name='"+req.body.middle_name+"', last_name='"+req.body.last_name+"', contact_number='"+req.body.phone+"' where sno = "+userId; 
  let query = db.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect('/home');
  });
});

router.post('/delete', (req, res) => {
  const userId = req.body.userId;
  let sql = `DELETE FROM contacts WHERE sno = ${userId}`;
  let query = db.query(sql,(err, result) => {
      if (err){
          throw err;
      }
      else{
          res.redirect('/');
      }
  }); 
});


module.exports = router;
