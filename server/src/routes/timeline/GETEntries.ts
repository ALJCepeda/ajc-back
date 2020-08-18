import TimelineService from "../../services/TimelineService";
import TimelineEntry from "../../../../shared/src/models/TimelineEntry";
import {GET, Input, Query} from "expressman";

class GETEntriesInput {
  @Query('limit', {
    validate(input:any) {
      if(isNaN(input) || input <= 0) throw new Error('Limit must be a number greater than 0');
    }
  })
  limit:number;
  
  @Query('skip',{
    validate(input:any) {
      if(isNaN(input) || input <= 0) throw new Error('Skip must be a number greater than 0');
    }
  })
  skip:number;
}

@Input(GETEntriesInput)
@GET('/timeline')
export default class GETEntries {
  constructor(
    private timelineService:TimelineService
  ) {}
  
  handle(payload): Promise<TimelineEntry[]> {
    const limit = parseInt(payload.limit);
    const page = parseInt(payload.page);
    
    return this.timelineService.entriesByPage(page, limit);
  }
}