import {API, GET,POST, PATCH, Swagger} from "expressman";
import TimelineEntryRepository from "../../adapters/TimelineEntryRepository";
import {CreateEntryInput, FetchEntriesInput, UpdateEntryInput} from "./EntriesControllerModels";
import {ITimelineEntry} from "ajc-shared";
import TimelineEntry from "../../models/TimelineEntry";

@API('/timeline')
class TimelineEntriesController {
  constructor(private timelineEntryRepository: TimelineEntryRepository) {}
  
  @POST()
  @Swagger()
  async CreateEntry(payload: CreateEntryInput): Promise<CreateEntryInput> {
    await this.timelineEntryRepository.insert(payload);
    return payload;
  }
  
  @GET()
  @Swagger()
  async GetEntry(payload: FetchEntriesInput): Promise<ITimelineEntry> {
    const { limit, page } = payload;
    return this.timelineEntryRepository.entries(limit, page)[0];
  }
  
  @PATCH("/:id")
  @Swagger()
  async UpdateEntry(payload: UpdateEntryInput): Promise<TimelineEntry> {
    return this.timelineEntryRepository.save(payload);
  }
}