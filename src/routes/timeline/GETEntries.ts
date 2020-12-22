import { GET, Input, Query, Integer, Wrap, Wrapperware } from "expressman";
import TimelineEntryRepository from "../../adapters/TimelineEntryRepository";
import TimelineEntry from "../../models/TimelineEntry";
import {TransactionWrapperware} from "../../middleware/wrapperware/TransactionWrapperware";

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
    validate: [ANumber, GreaterThan(-1)],
    transform: parseInt,
  })
  skip: number;
}

@Input(GETEntriesInput)
@GET("/timeline")
@Wrap(TransactionWrapperware as unknown as Wrapperware)
export default class GETEntries {
  constructor(private timelineEntryRepository: TimelineEntryRepository) {}

  handle(payload: GETEntriesInput): Promise<TimelineEntry[]> {
    const { limit, skip } = payload;
    return this.timelineEntryRepository.entries(limit, skip);
  }
}
