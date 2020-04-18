import {Request, Response, NextFunction} from 'express';
import {EntityManager, getConnection} from "typeorm"
import {Container} from "inversify";

export default function(container:Container) {
  return (req: Request, res: Response, next: NextFunction) => {
    const containerChild = container.createChild();
    const entityManager = getConnection().createEntityManager();

    containerChild.bind(EntityManager).toConstantValue(entityManager);

    res.locals.container = containerChild;
    next();
  }
}
