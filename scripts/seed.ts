import {createConnection, EntityManager} from "typeorm";
import {typeORMConfig} from "../src/config";
import UserRepository from "../src/adapters/UserRepository";
import bcrypt from 'bcrypt';
import * as yaml from "yaml";
import User from "../src/models/User";
import { readFileSync } from "fs";

const file = readFileSync('src/config/local.yaml', 'utf8')
const localConfig = yaml.parse(file);

async function createUser(entityManager: EntityManager, user:User) {
  const userRepository = entityManager.getCustomRepository(UserRepository);
  const password = await bcrypt.hash(user.password, 10);

  return userRepository.save({
    username: user.username,
    password: password,
    active: true
  });
}

createConnection(typeORMConfig).then((connection) => {
  const entityManager = connection.createEntityManager();

  const userCreate = localConfig.users.reduce((tail, user) => {
    return tail.then((newUser: User) => {
      console.log(`Creating: ${user.username}`);
      return createUser(entityManager, user);
    });
  }, Promise.resolve())

  return userCreate.then(() => {
    console.log('Finished creating users');
  })
});
