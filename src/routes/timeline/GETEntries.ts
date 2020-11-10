import TimelineEntry from "../../../../shared/src/models/TimelineEntry";
import { GET, Input, Query, Integer } from "expressman";
import TimelineEntryAdapter from "../../adapters/TimelineEntryAdapter";

const { ANumber, GreaterThan } = Integer;

class GETEntriesInput {
  @Query("limit", {
    default: 10,
    validate: [ANumber, GreaterThan(0)],
    transform: parseInt,
  })
  limit: number;

  @Query("skip", {
    default: 0,
    validate: [ANumber, GreaterThan(0)],
    transform: parseInt,
  })
  skip: number;
}

@Input(GETEntriesInput)
@GET("/timeline")
export default class GETEntries {
  constructor(private timelineEntryAdapter: TimelineEntryAdapter) {}

  handle(payload: GETEntriesInput): Promise<TimelineEntry[]> {
    const { limit, skip } = payload;
    return this.timelineEntryAdapter.entries(limit, skip);
  }
}
