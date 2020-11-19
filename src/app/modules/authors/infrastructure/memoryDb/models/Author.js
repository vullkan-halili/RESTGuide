/* eslint-disable require-await */

import { UnprocessableEntity } from "../../../../../utils/error";

/**
 * Example Author "fake mongoose-like model" class 
 * for testing if we decided not to use any in-memory DBMS process.
 * */
let authors = [];

export default class Author {
  constructor({ firstName, lastName, genres }) {
    this.id = authors.length + 1;
    this.firstName = firstName;
    this.lastName = lastName;
    this.genres = genres;
  }

  static async findAll() {
    return new Promise((resolve) => resolve(authors));
  }

  static clear() {
    authors = [];
  }

  static async findById(id) {
    return new Promise((resolve) => {
      const foundAuthor = authors
        .find((author) => Number(id) === Number(author.id));

      return resolve(foundAuthor);
    });
  }

  static async findOne(query = {}) {
    return new Promise((resolve) => {
      const foundAuthor = authors
        .find((author) => (
          Object.keys(query)
            .map((param) => author[param] === query[param])
        ));

      return resolve(foundAuthor);
    });
  }

  async save() {
    return new Promise((resolve, reject) => {
      const foundAuthor = authors.find((author) => (
        author.firstName === this.firstName &&
        author.lastName === this.lastName
      ));
      if (!foundAuthor) {
        authors.push(this);

        return resolve(this);
      }

      return reject(UnprocessableEntity);
    });
  }
}