import { injectable } from "inversify";
import BaseAdapter from "./BaseAdapter";
import TimelineEntry from "../../../shared/dist/models/TimelineEntry";

@injectable()
export default class TimelineEntryAdapter extends BaseAdapter<TimelineEntry> {
  entity = TimelineEntry;

  entries(limit: number, skip: number) {
    return this.repository.find({ take: limit, skip });
  }
}
