import {API, GET,POST, PATCH} from "expressman";
import TimelineEntryRepository from "../../adapters/TimelineEntryRepository";
import {CreateEntryInput, FetchEntriesInput, UpdateEntryInput} from "./EntriesControllerModels";
import TimelineEntry from "../../models/TimelineEntry";
import {ITimelineEntry} from "../../types";

@API('/timeline')
class TimelineEntriesController {
  constructor(private timelineEntryRepository: TimelineEntryRepository) {}
  
  @POST()
  async CreateEntry(payload: CreateEntryInput): Promise<CreateEntryInput> {
    await this.timelineEntryRepository.insert(payload);
    return payload;
  }
  
  @GET()
  async GetEntry(payload: FetchEntriesInput): Promise<ITimelineEntry> {
    const { limit, page } = payload;
    return this.timelineEntryRepository.entries(limit, page)[0];
  }
  
  @PATCH("/:id")
  async UpdateEntry(payload: UpdateEntryInput): Promise<TimelineEntry> {
    return this.timelineEntryRepository.save(payload);
  }
}