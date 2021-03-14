import {Body, Query, Integer, Param} from "expressman";
import {ITimelineEntry} from "ajc-shared";

const { ANumber, GreaterThan } = Integer;

export class CreateEntryInput implements ITimelineEntry {
  @Body({
    default: "What's an entry without a message though?"
  })
  message:string;
  
  @Body({
    default: 'https://en.wikipedia.org/wiki/Doge_(meme)#/media/File:Original_Doge_meme.jpg'
  })
  imageURL:string;
  
  @Body()
  label:string;
  
  @Body({
    optional: true
  })
  labelURL:string;
}

export class FetchEntriesInput {
  @Query("limit", {
    default: 10,
    validate: [ANumber, GreaterThan(0)]
  })
  limit: number;
  
  @Query("page", {
    default: 0,
    validate: [ANumber, GreaterThan(-1)]
  })
  page: number;
}

export class UpdateEntryInput implements Partial<ITimelineEntry> {
  @Param({
    validate: [ GreaterThan(0) ]
  })
  id: number;
  
  @Body()
  message?:string;
  
  @Body()
  imageURL?:string;
  
  @Body()
  label?:string;
  
  @Body()
  labelURL?:string;
}