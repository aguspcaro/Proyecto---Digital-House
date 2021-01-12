const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

let usersControllers = {
  root : function(req, res, next) {
    res.render("users/users", { users } );
  },
  register: function (req, res, next) {
    res.render("users/register");
  },
  registration: function (req, res, next) {
    users.push({
      id: Date.now(),
      nameRegister: req.body.nameRegister,
      lastNameRegister: req.body.lastNameRegister,
      emailRegister: req.body.emailRegister,
      passwordRegister: req.body.passwordRegister,
      confirmPasswordRegister : req.body.confirmPasswordRegister
    });
    
    let usuario = JSON.stringify(users);
    fs.writeFileSync(usersFilePath, usuario);

    res.redirect('users/users');
  },
  login: function (req, res, next) {
    res.render("users/login");
  },
  checkLogin: function (req, res, next) {
    res.send("Has ingresado correctamente");
  },
  suscribe: function (req, res, next) {
    res.render("thankYou");
  },
  delete : function(req, res) {
    const filtrar = users.filter((user) => user.id != req.params.id);
    let user = JSON.stringify(filtrar);
    fs.writeFileSync(usersFilePath, user);
    res.redirect("users/users");
  },
  edit : function(req, res) {
    users.forEach(function(user) {
      if (user.id == req.params.id) {
        user.nameRegister = req.body.nameRegister;
        user.lastNameRegister = req.body.lastNameRegister;
        user.emailRegister = req.body.emailRegister;
        user.passwordRegister = req.body.passwordRegister;
        user.confirmPasswordRegister = req.body.confirmPasswordRegister;
      }
    })
    let usuario = JSON.stringify(users);
    fs.writeFileSync(usersFilePath, usuario);

    res.redirect("users/users")
  },
  modificar : function(req, res) {
    let codigo = req.params.id;
    let user = users.find(function (busca) {
      return busca.id == codigo;
    });

    res.render('users/users', { user });
  }
};

module.exports = usersControllers;
