'use strict';

const Joi = require('joi');

const MovieValidator = require('../../lib/validators/movie');

describe('movie validator', () => {

  describe('name', () => {

    it('is required', () => {
      const payload = {};
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path).to.eql('name');
      expect(result.error.details[0].type).to.eql('any.required');
    });

    it('is less than 255 characters', () => {
      const payload = { name: 'b'.repeat(256) };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path).to.eql('name');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

  describe('release_year', () => {

    it('is after 1878', () => {
      const payload = {
        name: 'Test Movie',
        release_year: 1776
      };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const payload = {
        name: 'Test Movie',
        release_year: 8675309
      };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

});
