'use strict';

const Movie = require('../../../models/movie');

exports.create = (payload) => {
  return new Movie().save(payload)
  .then((movie) => {
    return new Movie({ id: movie.id }).fetch();
  });
};

exports.list = (filter) => {
  return new Movie().query((qb) => {
    if (filter.release_year) {
      qb.where('release_year', filter.release_year);
    }

    if (filter.title) {
      qb.whereRaw('LOWER(title) = ?', filter.title);
    }
  })
  .fetchAll();
};
