import { DependencyContainer } from "expressman";
import {EntityManager, getConnection} from "typeorm";

export function TransactionWrapperware(container: DependencyContainer, next: () => Promise<any>): Promise<any> {
	return getConnection().transaction(async (manager) => {
		container.register(EntityManager, { useValue: manager });
		return next();
	});
}
