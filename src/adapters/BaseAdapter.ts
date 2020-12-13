import { EntityManager, Repository } from "typeorm";
import { inject } from "expressman";
import {Newable} from "expressman/dist/types";

export default abstract class BaseAdapter<EntityType> {
  protected abstract entity: Newable<EntityType>;
  protected get repository(): Repository<EntityType> {
    debugger;
    return this.entityManager.getRepository(this.entity);
  }

  constructor(
    @inject(EntityManager) private entityManager: EntityManager
  ) {}
}
