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

	// logging: false,
});

// Connect to DB
sequelize
  .authenticate()
    .then(() => {
      console.log(chalk.blue('Connection has been established successfully.'));
    })
  .catch(err => {
    console.error(chalk.red('Unable to connect to the database:', err));
  });

const Movie = sequelize.define('movie', {
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  active: { type: Sequelize.BOOLEAN },
});

// Sync your model
Movie.sync().then(() => {
  console.log(chalk.blue("Sync model!"));
});

// Create
Movie.create({
  name: 'Avengers',
  description: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
  active: true,
}).then(() => console.log(chalk.blue("Avengers created!")));

// Two movies!
Movie.create({
  name: 'Coco',
  description: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
  active: false
}).then(() => console.log(chalk.blue("Coco created!")));;

// Show all movie names
Movie.findAll().then(movies => {
  movies.forEach(movie => {
    console.log(chalk.blue(movie.name)) 
  })
});

// Create with build and save
// Build
const anotherMovie = Movie.build({
  name: 'Jurassic World',
  description: 'A new theme park, built on the original site of Jurassic Park, creates a genetically modified hybrid dinosaur, which escapes containment and goes on a killing spree.',
  active: true
});

Movie.findAll().then(movies => {
  movies.forEach(movie => {
    console.log(chalk.blue(movie.name)) // No Jurassic World on the list!
  })
});

// Save
anotherMovie.save().then(() => console.log(chalk.blue("Jurassic World created!")) );

Movie.findAll().then(movies => {
  movies.forEach(movie => {
    console.log(chalk.blue(movie.name)) // Jurassic World now on the list!
  })
});

// Update register
anotherMovie.name = 'Jurassic World The end please';
anotherMovie.save().then(() =>
  console.log(chalk.blue(anotherMovie.get('name'))
));

Movie.findAll().then(movies => {
  movies.forEach(movie => {
    console.log(chalk.blue(movie.name)) // Jurassic World on the list with new name!
  })
});

// GOTCHA: Update register of attribute that does not exist
anotherMovie.update({name2: 'Name2 does not exist'}).
  then(() => console.log(chalk.blue('weird success!'))).
  catch(() => console.log(chalk.red('should be error!')));

// Destroy movie
anotherMovie.destroy().then(() => console.log(chalk.blue("Jurassic World destroyed!")));

Movie.findAll().then(movies => {
  movies.forEach(movie => {
    console.log(chalk.blue(movie.get('name'))); // No Jurassic World again :(
  })
});

// Find All by certain attributes
Movie.findAll({
  where: {
    active: true
  }
}).then(movies => {
  movies.forEach(movie => {
    console.log(chalk.blue(movie.name))
  })
});

Movie.findAll({
  where: {
    name: {
        [Sequelize.Op.like]: "Ave%"
    }
  }
}).then(movies => {
  movies.forEach(movie => {
    console.log(chalk.blue(movie.name))
  })
});

// Find One
Movie.findOne({
  where: {
    name: 'Avengers'
  }
}).then(movie => {
  console.log(chalk.blue(movie.name))
});
