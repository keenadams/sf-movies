'use strict';

const Knex = require('../../../../lib/libraries/knex');

const Movies = require('../../../../lib/server');

describe('movies integration', () => {

  describe('create', () => {

    beforeEach(() => {
      const movieOne = { title: 'Batman Begins', release_year: 2005 };
      const movieTwo = { title: 'The Dark Knight', release_year: 2008 };
      const movieThree = { title: 'The Dark Knight Rises', release_year: 2012 };

      return Knex('movies').insert([movieOne, movieTwo, movieThree]);
    });

    it('creates a movie', () => {
      return Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { title: 'Volver' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('movie');
      });
    });

    it('lists movies', () => {
      return Movies.inject({
        url: '/movies',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.data).to.have.lengthOf(3);
      });
    });

  });

});
