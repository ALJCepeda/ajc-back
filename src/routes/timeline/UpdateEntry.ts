import {Input, Body, Param, Integer, PATCH} from "expressman";
import TimelineEntryRepository from "../../adapters/TimelineEntryRepository";
import {ITimelineEntry} from "../../types";

const { GreaterThan } = Integer;

class UpdateEntryInput implements Partial<ITimelineEntry> {
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

@Input(UpdateEntryInput)
@PATCH("/timeline/:id")
export default class UpdateTimelineEntry {
	constructor(private timelineEntryRepository: TimelineEntryRepository) {}

	async handle(payload: UpdateEntryInput): Promise<UpdateEntryInput> {
		await this.timelineEntryRepository.update({ id:payload.id }, payload);
		return payload;
	}
}
