import TimelineEntry from "../models/TimelineEntry";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(TimelineEntry)
export default class TimelineEntryRepository extends Repository<TimelineEntry> {
  entries(limit: number, skip: number) {
    return this.find({ take: limit, skip });
  }
}
