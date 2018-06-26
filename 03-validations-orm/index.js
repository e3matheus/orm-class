const chalk = require('chalk');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

	// logging: false,
});

// Validations
const Movie = sequelize.define('movie', {
  name: { type: Sequelize.STRING, validate: { len: [0, 20] } },
  description: { type: Sequelize.STRING },
  active: { type: Sequelize.BOOLEAN }
});

Movie.sync().then(() => {
  let noName = Movie.build({
    name: "",
		description: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
    active: true
	});

  noName.save().then( (movie) => console.log(movie) ).catch(error => console.log(error.errors[0].messages));

  let badNameMovie = Movie2.build({
    name: "Night of the Day of the Dawn of the Son of the Bride of the Return of the Revenge of the Terror of the Attack of the Evil, Mutant, Hellbound, Flesh-Eating Subhumanoid Zombified Living Dead, Part 3",
		description: 'Worst movie ever',
    active: true
	});

  noName.save().then( (movie) => console.log(movie) ).catch(error => console.log(error.errors[0].message));
});
