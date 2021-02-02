module.exports =  function(sequelize, dataTypes){

    let alias = "Brands";

    let cols={

        id:{
            type : dataTypes.INTEGER ,  
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type : dataTypes.STRING(100)
        },

        }
        let config = {
            tableName: "brands",
            Timestamps: true
    }

    let brands = sequelize.define(alias, cols, config);

     Brands.associate = function(models){
            
      Brands.hasMany(models.products, {
      
          as: "brands",
      foreignKey: "id"
       })
 }

 

return brands;


}