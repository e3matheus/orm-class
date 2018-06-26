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

Movie.sync().then(() => {
  Movie.create({
		name: 'Avengers',
		description: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
    active: true
	});

  Movie.create({
		name: 'Coco',
		description: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    active: false
	});

	Movie.findOne().then(movie => { console.log(movie.get('name')); });
});

Movie.findAll().then(movies => { console.log(movies) })

// n:1
Movie.hasMany(Character);

Character.sync({ force: true }).then(() => {
	Movie.findOne().then(movie => {
    console.log(movie.get('name'));

    movie.createCharacter({
      name: 'Hulk',
      gender: 'm',
    }).then(character => {
      movie.hasCharacter(character).then(result => console.log(result))
    });
  });
});

// 1:n
Character.belongsTo(Movie);

Character.findOne().then(character => {
  console.log(character.getMovie().then(movie => console.log(movie.get('name'))));
});

Actor.hasMany(Character);
Character.belongsTo(Actor);

Actor.sync({}).then(() => {
  Actor.create({
    name: 'Mark Ruffalo'
  }).then(actor => {
    Character.findOne({ where: {name: 'Hulk'} }).then(character => {
      character.setActor(actor);
    })
  });
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

// n:m
Actor.belongsToMany(Movie, { through: 'character' });

Actor.findOne().then(actor => {
  actor.getMovies().then(movies => {
    movies.forEach(movie => {
      console.log(movie.name)
    })
  })
})
