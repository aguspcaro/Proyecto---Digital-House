const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const usersJSON = fs.readFileSync(usersFilePath, 'utf-8');
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

let users;
if(usersJSON == "") {
  users = [];
} else {
  users = JSON.parse(usersJSON)
}

let usersControllers = {
  root : function(req, res, next) {
    res.render("users", {users} );
  },
  register: function (req, res, next) {
    res.render("register");
  },
  registration: function (req, res, next) {
    users.push({
      name: req.body.nameRegister,
      lastName: req.body.lastNameRegister,
      email: req.body.emailRegister,
      password: req.body.passwordRegister,
      verifyPassword : req.body.confirmPasswordRegister
    });
    
    let usuario = JSON.stringify(users);
    fs.writeFileSync(usersFilePath, usuario);

    res.redirect('/users');
  },
  login: function (req, res, next) {
    res.render("login");
  },
  checkLogin: function (req, res, next) {
    res.send("Has ingresado correctamente");
  },
  suscribe: function (req, res, next) {
    res.render("thankYou");
  

  },
};

module.exports = usersControllers;
