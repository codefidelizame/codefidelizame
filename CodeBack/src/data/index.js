require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_DEPLOY
  } = require('../config/envs');
//-------------------------------- CONFIGURACION PARA TRABAJAR LOCALMENTE-----------------------------------
const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
//-------------------------------------CONFIGURACION PARA EL DEPLOY---------------------------------------------------------------------
// const sequelize = new Sequelize(DB_DEPLOY , {
//       logging: false, // set to console.log to see the raw SQL queries
//       native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//     }
//   );

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Client, Comercio, Service, Receipt, Subscription, ClientComercio } = sequelize.models;



// Relación: Muchos a Muchos entre Comercio y Client
Comercio.belongsToMany(Client, { through: 'ClientComercio' });
Client.belongsToMany(Comercio, { through: 'ClientComercio' });

//cada servicio vendido pertenece a un comercio
Comercio.hasMany(Service, { foreignKey: 'comercioId' });
Service.belongsTo(Comercio, { foreignKey: 'comercioId' });


// Relación: Un Cliente puede comprar varios Servicios
Client.hasMany(Service, { foreignKey: 'clientId' });
Service.belongsTo(Client, { foreignKey: 'clientId' });

// Relación: Un Servicio tiene un Comprobante
Service.hasOne(Receipt, { foreignKey: 'serviceId' });
Receipt.belongsTo(Service, { foreignKey: 'serviceId' });

Comercio.hasMany(Subscription, { foreignKey: 'comercioId' });
Subscription.belongsTo(Comercio, { foreignKey: 'comercioId' });
//---------------------------------------------------------------------------------//
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
