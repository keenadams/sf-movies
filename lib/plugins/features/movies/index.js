'use strict';

const Controller           = require('./controller');
const CreateMovieValidator = require('../../../validators/movies/create');
const ListMoviesValidator  = require('../../../validators/movies/list');

exports.register = (server, options, next) => {

  server.route([{
    method: 'POST',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.create(request.payload));
      },
      validate: {
        payload: CreateMovieValidator
      }
    }
  }, {
    method: 'GET',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        return Controller.list(request.query)
        .then((movies) => {
          reply({ data: movies });
        });
      },
      validate: {
        query: ListMoviesValidator
      }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'movies'
};
