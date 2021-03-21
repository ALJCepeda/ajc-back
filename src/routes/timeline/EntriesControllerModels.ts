import {Body, Query, Param, Integer} from "expressman";
import {ITimelineEntry} from "../../types";

const { GreaterThan } = Integer;

export class CreateEntryInput {
  @Body({
    default: "What's an entry without a message though?"
  })
  message?:string;
  
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
    validate: [GreaterThan(0)]
  })
  limit: number;
  
  @Query("page", {
    default: 0,
    validate: [GreaterThan(-1)]
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