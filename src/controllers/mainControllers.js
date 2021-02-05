const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require("../../database/models/index")

let mainControllers = {
  index: function (req, res, next) {
    
    let destacado = products.filter (function (product) {
      return product.categoria == 'destacados'
    } );
    
    let oferta = products.filter (function (product) {
    return product.categoria == 'ofertas'
    } );

    let lanzamiento = products.filter (function (product) {
    return product.categoria == 'lanzamientos'
    } );

    let recomendado = products.filter (function (product) {
    return product.categoria == 'recomendados'
    } );


    let userLogueado


    if (req.session != undefined) {
     userLogueado = {
        session: req.session.user
      }
    }
    else {
      userLogueado = {}
    }

    res.render ('index', {destacado, oferta, lanzamiento, recomendado,  userLogueado})

      
  },

  search: function (req, res) {
    let palabraBuscada = req.query.homeSearch;

    res.send(palabraBuscada);
  }
}

module.exports = mainControllers;