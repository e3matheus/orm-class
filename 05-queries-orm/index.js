const chalk = require('chalk');
const Sequelize = require('sequelize');
const csv = require('fast-csv');
const fs = require('fs');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // logging: false
});

const Movie = sequelize.define('movie', {
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  score: { type: Sequelize.BOOLEAN },
}, {
  scopes: {
    good: {
      where: {
        score: {
          [Sequelize.Op.lte]: 4
        }
      }
    },
    byNameDesc: {
      order: [['name', 'DESC']]
    }
  }
});

const loadMovies = () => {
  let movies = [];

  return new Promise((resolve, reject) => {
   fs.createReadStream("movies.csv")
      .pipe(csv({ headers: true }))
      .on("data", function(data){
        movies.push(data)
      })
      .on("end", function(){
        return resolve(Promise.all(movies.map(data =>
          Movie.create({
           name: data.name,
           description: data.description,
           score: data.score
          })
        )))
      });
  })
}

const countMovies = () => {
  return Movie.count().then(count => console.log(chalk.blue("Count: " + count)));
};

const printMovieNames = () => {
  return Movie.findAll()
          .then(movies => {
            console.log("-------- Movies --------------");
            movies.map(movie => console.log(chalk.blue(movie.name)));
          });
};

const orderMoviesByName = () => {
  return Movie.findAll({ order: [['name', 'ASC']]})
          .then(movies => {
            console.log("-------- Movies --------------");
            movies.map(movie => console.log(chalk.blue(movie.name)));
          });
};

const top3MovieNames = () => {
  return Movie.findAll({ order: [['score', 'DESC']], limit: 3 })
          .then(movies => {
            console.log("-------- Movies --------------");
            movies.map(movie => console.log(chalk.blue(movie.name)));
          });
};

const rawMovieNamesAndScores = () => {
  return sequelize.query("SELECT name, score FROM movies").then(result => {
    const [rows, statement] = result;

    console.log("---------- Raw Data ---------");
    rows.forEach(row => console.log("name: " + row.name + ", score: " + row.score));
    console.log(statement);
  });
};

const goodMovieNames = () => {
  return Movie.scope('good')
          .findAll()
          .then(movies => {
            console.log("-------- Movies --------------");
            movies.map(movie => console.log(chalk.blue(movie.name)));
          });
};

const goodMovieNamesByNameDesc = () => {
  return Movie.scope('good', 'byNameDesc')
          .findAll()
          .then(movies => {
            console.log("-------- Movies --------------");
            movies.map(movie => console.log(chalk.blue(movie.name)));
          });
};

const somethingWentWrong = (error) => {
  console.log(chalk.red("error!", error))
};

Movie.sync()
  .then(loadMovies)
  .then(countMovies)
  .then(printMovieNames)
  .then(orderMoviesByName)
  .then(top3MovieNames)
  .then(rawMovieNamesAndScores)
  .then(goodMovieNames)
  .then(goodMovieNamesByNameDesc)
  .catch(somethingWentWrong)
