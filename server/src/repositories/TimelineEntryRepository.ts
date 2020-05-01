import {EntityRepository, Repository} from "typeorm";
import TimelineEntry from "../models/TimelineEntry";
import {injectable} from "inversify";

@injectable()
@EntityRepository(TimelineEntry)
export default class TimelineEntryRepository extends Repository<TimelineEntry> {
  entriesByPage(page:number, take:number) {
    const skip = (page - 1) * take;
    return this.find({ skip, take });
  }
}
