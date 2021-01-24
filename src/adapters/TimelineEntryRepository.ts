import TimelineEntry from "../models/TimelineEntry";
import {EntityRepository, Repository} from "typeorm";
import {ITimelineEntry} from "../types";

@EntityRepository(TimelineEntry)
export default class TimelineEntryRepository extends Repository<TimelineEntry> {
  entries(limit: number, skip: number): Promise<ITimelineEntry[]> {
    return this.find({ take: limit, skip });
  }
}
