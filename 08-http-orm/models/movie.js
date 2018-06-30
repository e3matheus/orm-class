'use strict';
module.exports = (sequelize, DataTypes) => {
  var Movie = sequelize.define('movie', {
    name: DataTypes.STRING
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
  };
  return Movie;
};
