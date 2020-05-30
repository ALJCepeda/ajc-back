import {createConnection} from "typeorm";
import {typeORMConfig} from "../src/config";
import UserRepository from "../src/repositories/UserRepository";
import bcrypt from 'bcrypt';

createConnection(typeORMConfig).then(async (connection) => {
  const entityManager = connection.createEntityManager();
  const userRepository = entityManager.getCustomRepository(UserRepository);
  const password = await bcrypt.hash('Password123', 10);

  const result = await userRepository.save({
    username: 'vlegm',
    password: password,
    active: true
  });

  console.log('Created used:', result);
});