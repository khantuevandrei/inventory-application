#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS trainer_pokemon;
DROP TABLE IF EXISTS pokemons;
DROP TABLE IF EXISTS trainers;
DROP TABLE IF EXISTS types;

CREATE TABLE IF NOT EXISTS types (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  type VARCHAR (255) NOT NULL UNIQUE
);

INSERT INTO types (type)
VALUES
  ('grass'),
  ('water'),
  ('fire'),
  ('electric');

CREATE TABLE IF NOT EXISTS trainers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  trainer VARCHAR (255) NOT NULL
);

INSERT INTO trainers (trainer)
VALUES
  ('Bryan'),
  ('Odin'),
  ('Damon');

CREATE TABLE IF NOT EXISTS pokemons (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  pokemon VARCHAR (255) NOT NULL UNIQUE,
  typeid INTEGER NOT NULL REFERENCES types(id)
);

INSERT INTO pokemons (pokemon, typeid)
VALUES
  ('Bulbasaur', 1),
  ('Squirtle', 2),
  ('Charmander', 3),
  ('Pikachu', 4);

CREATE TABLE IF NOT EXISTS trainer_pokemon (
  trainerid INTEGER REFERENCES trainers(id) ON DELETE CASCADE,
  pokemonid INTEGER REFERENCES pokemons(id) ON DELETE CASCADE,
  PRIMARY KEY (trainerid, pokemonid)
);

INSERT INTO trainer_pokemon (trainerid, pokemonid)
VALUES
  (1, 1),
  (1, 2),
  (2, 2),
  (2, 3),
  (3, 3),
  (3, 4);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
