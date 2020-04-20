import {EntityRepository, Repository} from "typeorm";
import User from "../models/User";
import {injectable} from "inversify";

@injectable()
@EntityRepository(User)
export default class UserRepository extends Repository<User> { }