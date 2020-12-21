import { injectable } from "expressman";
import { EntityManager } from "typeorm";
import UserRepository from "../adapters/UserRepository";

@injectable()
export default class UserService {
  userRepository: UserRepository;

  constructor(private entityManager: EntityManager) {
    this.userRepository = this.entityManager.getCustomRepository(
      UserRepository
    );
  }

  entry(username: string) {
    return this.userRepository.findOne({ username });
  }
}
