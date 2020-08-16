import {Request, Response, NextFunction} from 'express';
import {EntityManager, getConnection} from "typeorm"
import {Container} from "inversify";
import {tokens} from "../tokens";
import * as uuid from 'uuid';

export default function(container:Container) {
  return (req: Request, res: Response, next: NextFunction) => {
    const containerChild = container.createChild();
    const entityManager = getConnection().createEntityManager();
    
    containerChild.bind(tokens.traceId).toConstantValue(uuid.v4());
    containerChild.bind(EntityManager).toConstantValue(entityManager);

    res.locals.container = containerChild;
    next();
  }
}
