import {EntityRepository, Repository} from "typeorm";
import TimelineEntry from "../models/TimelineEntry";

@EntityRepository(TimelineEntry)
export default class TimelineEntryRepository extends Repository<TimelineEntry> {
  entriesByPage(page:number, take:number) {
    const skip = (page - 1) * take;
    return this.find({ skip, take });
  }
}
