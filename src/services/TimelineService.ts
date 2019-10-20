import {EntityManager} from "typeorm";
import {injectable} from "inversify";
import TimelineEntryRepository from "../repositories/TimelineEntryRepository";

@injectable()
export default class TimelineService {
  timelineEntryRepository:TimelineEntryRepository;

  constructor(
    private entityManager:EntityManager
  ) {
    this.timelineEntryRepository = this.entityManager.getCustomRepository(TimelineEntryRepository);
  }

  entriesByPage(page:number, limit:number) {
    return this.timelineEntryRepository.entriesByPage(page, limit);
  }
}
