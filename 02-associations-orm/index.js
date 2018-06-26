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
  gender: { type: Sequelize.STRING }
});

const Actor = sequelize.define('actor', {
  name: { type: Sequelize.STRING },
  age: { type: Sequelize.INTEGER },
});

// Has Many
Movie.hasMany(Character);

// Belongs To
Character.belongsTo(Movie);

Actor.hasMany(Character);
Character.belongsTo(Actor);

// belongs to Many
Actor.belongsToMany(Movie, { through: 'character' });

Promise.all([Movie.sync(), Character.sync(), Actor.sync()]).then(() => {
  console.log(chalk.blue("Loaded models!"));
});

Movie.create({
  name: 'Avengers',
  description: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
  active: true
});

// Show all movie names
Movie.findAll().then(movies => {
  movies.forEach(movie => {
    console.log(chalk.blue(movie.name));
  })
});

Movie.findOne().then(movie => {
  console.log(movie.get('name'));

  movie.createCharacter({
    name: 'Hulk',
    gender: 'm',
  }).then(character => {
    movie.hasCharacter(character).then(result => console.log(chalk.blue(result)))
  });
});

Character.findOne().then(character => {
  console.log(character.getMovie().then(movie => console.log(chalk.blue(movie.get('name')))));
});

Actor.create({
  name: 'Mark Ruffalo'
}).then(actor => {
  Character.findOne({ where: {name: 'Hulk'} }).then(character => {
    character.setActor(actor);
  })
});

Actor.findOne().then(actor => {
  Character.sync({ force: true }).then(() => {
    Movie.findOne().then(movie => {
      movie.createCharacter({
        name: 'Hulk',
        gender: 'm',
      }).then(character => {
        character.setActor(actor);
      })
    })
  })
})

Actor.findOne().then(actor => {
  actor.getMovies().then(movies => {
    movies.forEach(movie => {
      console.log(chalk.blue(movie.name))
    })
  })
})
