import {EntityRepository, Repository} from "typeorm";
import {injectable} from "inversify";
import TimelineEntry from "../../../shared/src/models/TimelineEntry";

@injectable()
@EntityRepository(TimelineEntry)
export default class TimelineEntryRepository extends Repository<TimelineEntry> {
  entriesByPage(page:number, take:number) {
    const skip = (page - 1) * take;
    return this.find({ skip, take });
  }
}
