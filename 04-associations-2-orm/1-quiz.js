const chalk = require('chalk');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

const Movie = sequelize.define('movie', {
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  active: { type: Sequelize.BOOLEAN }
});

const Character = sequelize.define('character', {
  name: { type: Sequelize.STRING },
  gender: { type: Sequelize.STRING },
});

Character.belongsTo(Movie);

Promise.all([Movie.sync(), Character.sync()]).then(() => {
  console.log(chalk.blue("Loaded models!"));
});

// Where is the Id?
// Name 2 method that generate the belongsTo association
// Movie.hasCharacter(character)
// character.getMovie() ?
