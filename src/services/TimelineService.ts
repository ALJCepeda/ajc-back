import {EntityManager} from "typeorm";
import {injectable} from "inversify";
import TimelineEntryRepository from "../repositories/TimelineEntryRepository";
import TimelineEntry from "../models/TimelineEntry";

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

  upsert(entry:TimelineEntry) {
    return this.timelineEntryRepository.save(entry);
  }

  remove(id:number) {
    return this.timelineEntryRepository.delete({ id });
  }
}
