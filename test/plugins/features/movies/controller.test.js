'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');
const Knex       = require('../../../../lib/libraries/knex');
const Movie      = require('../../../../lib/models/movie');

describe('movie controller', () => {

  describe('create', () => {

    it('creates a movie', () => {
      const payload = { title: 'WALL-E' };

      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('title')).to.eql(payload.title);

        return new Movie({ id: movie.id }).fetch();
      })
      .then((movie) => {
        expect(movie.get('title')).to.eql(payload.title);
      });
    });

  });

  describe('list', () => {

    beforeEach(() => {
      const movieOne = { title: 'Batman Begins', release_year: 2005 };
      const movieTwo = { title: 'The Dark Knight', release_year: 2008 };
      const movieThree = { title: 'The Dark Knight Rises', release_year: 2012 };

      return Knex('movies').insert([movieOne, movieTwo, movieThree]);
    });

    it('lists all movies', () => {
      const query = {};

      return Controller.list(query)
      .then((movies) => {
        expect(movies).to.have.lengthOf(3);
      });
    });

    it('filters by title', () => {
      const query = { title: 'the dark knight' };

      return Controller.list(query)
      .then((movies) => {
        expect(movies).to.have.lengthOf(1);
        expect(movies.models[0].get('title')).to.eql('The Dark Knight');
      });
    });

    it('filters by release_year', () => {
      const query = { release_year: 2012 };

      return Controller.list(query)
      .then((movies) => {
        expect(movies).to.have.lengthOf(1);
        expect(movies.models[0].get('release_year')).to.eql(2012);
      });
    });

  });

});
