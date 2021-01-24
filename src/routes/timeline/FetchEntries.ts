import { GET, Input, Query, Integer } from "expressman";
import TimelineEntryRepository from "../../adapters/TimelineEntryRepository";
import {ITimelineEntry} from "../../types";

const { ANumber, GreaterThan } = Integer;

class FetchEntriesInput {
  @Query("limit", {
    default: 10,
    validate: [ANumber, GreaterThan(0)],
    transform: parseInt,
  })
  limit: number;

  @Query("skip", {
    default: 0,
    validate: [ANumber, GreaterThan(-1)],
    transform: parseInt,
  })
  skip: number;
}

@Input(FetchEntriesInput)
@GET("/timeline")
export default class FetchEntries {
  constructor(private timelineEntryRepository: TimelineEntryRepository) {}

  handle(payload: FetchEntriesInput): Promise<ITimelineEntry[]> {
    const { limit, skip } = payload;
    return this.timelineEntryRepository.entries(limit, skip);
  }
}
