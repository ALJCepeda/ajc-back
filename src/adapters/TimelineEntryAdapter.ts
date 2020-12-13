import { injectable } from "expressman";
import BaseAdapter from "./BaseAdapter";
import TimelineEntry from "../models/TimelineEntry";

@injectable()
export default class TimelineEntryAdapter extends BaseAdapter<TimelineEntry> {
  entity = TimelineEntry;

  entries(limit: number, skip: number) {
    debugger;
    return this.repository.find({ take: limit, skip });
  }
}
