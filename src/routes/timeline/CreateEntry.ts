import {POST, Input, Body} from "expressman";
import TimelineEntryRepository from "../../adapters/TimelineEntryRepository";
import {ITimelineEntry} from "../../types";

class CreateEntryInput implements ITimelineEntry {
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

@Input(CreateEntryInput)
@POST("/timeline")
export default class CreateEntry {
	constructor(private timelineEntryRepository: TimelineEntryRepository) {}

	async handle(payload: CreateEntryInput): Promise<CreateEntryInput> {
		await this.timelineEntryRepository.insert(payload);
		return payload;
	}
}
