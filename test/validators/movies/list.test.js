'use strict';

const Joi = require('joi');

const ListMoviesValidator = require('../../../lib/validators/movies/list');

describe('list movies validator', () => {

  describe('title', () => {

    it('is a string', () => {
      const payload = { title: 'The Dark Knight' };
      const result = Joi.validate(payload, ListMoviesValidator);

      expect(result.error).to.not.exist;
      expect(result.value.title).to.be.a('string');
    });

  });

  describe('release_year', () => {

    it('is allowed', () => {
      const payload = { release_year: 2002 };
      const result = Joi.validate(payload, ListMoviesValidator);

      expect(result.error).to.not.exist;
      expect(result.value.release_year).to.eql(payload.release_year);
    });

  });

});
