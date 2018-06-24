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

	logging: false,
});

sequelize
  .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Movie = sequelize.define('movie', {
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
});

Movie.sync().then(() => {
  Movie.create({
		name: 'Avengers',
		description: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.'
	});

	Movie.findOne().then(movie => {
		console.log(movie.get('name'));
	});
});

Movie.findAll().then(movies => {
	// console.log(users)
})
