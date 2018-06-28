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

  logging: false
});

const User = sequelize.define('user', {
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
  location: { type: Sequelize.STRING },
  progress: { type: Sequelize.INTEGER },
}, {
  hooks: {
    beforeValidate: (user, options) => {
      let progress = 0;
      if (user.name) {
        progress = progress + 1;
      }
      if (user.description) {
        progress = progress + 1;
      }
      if (user.location) {
        progress = progress + 1;
      }
      user.progress = (progress * 100/3);
    }
  }
});

const createUser = () => {
  return User.create({
    name: "elias",
    description: "Mentor"
  })
};

const printUserProgress = (user) => {
  return new Promise((resolve, reject) => {
    console.log("El progreso de " + user.name + " es " + user.progress);
    resolve(user);
  });
};

const fillAllAttributes = (user) => {
  return user.update({
    location: "Monterrey"
  });
};

const somethingWentWrong = (error) => {
  console.log(chalk.red("error!", error))
};

User.sync()
  .then(createUser)
  .then(printUserProgress)
  .then(fillAllAttributes)
  .then(printUserProgress)
  .catch(somethingWentWrong)
