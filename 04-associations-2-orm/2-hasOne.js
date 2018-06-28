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

// Character.belongsTo(Movie);
Movie.hasOne(Character);

let createAvenger = () => {
  return Movie.create({
    name: 'Avengers',
    description: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
    active: true
  })
};

let createHulk = () => {
  return Character.create({
        name: 'Hulk',
        gender: 'm',
      })
};

let findHulkAndTheAvengers = () => {
  return Promise.all([Movie.findOne(), Character.findOne()]);
};

let assignCharacterToMovie = (values) => {
  const [movie, character] = values;

  return movie.setCharacter(character);
};

let printSummary = () => {
  Movie.findOne({ where: { name: "Avengers" }})
    .then(movie => console.log(chalk.blue(movie.name)));
};

let somethingWentWrong = (error) => {
  console.log(chalk.red("error!", error))
};

Promise.all([Movie.sync(), Character.sync()])
  .then(createAvenger)
  .then(createHulk)
  .then(findHulkAndTheAvengers)
  .then(assignCharacterToMovie)
  .then(printSummary)
  .catch(somethingWentWrong)

// Should it be?
// Movie.hasOne(Character, { as: "MainCharacter"});
//
// Create in one moment everyhing!
