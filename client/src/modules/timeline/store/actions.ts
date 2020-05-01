import {timelineAPI} from "@/modules/timeline/store/api";
import {APIAction} from "@/models/Action";

class TimelineAction <
  IAPI extends IEndpoint<IAPI['IRequest'], IAPI['IResponse']>
> extends APIAction<TimelineModuleState, IAPI> {
  module = 'timeline';
}

export const TimelineActions = {
  LOAD: new TimelineAction<ITimelinePage>('Fetch a page of TimelineEntries', (context, action) => {
    return timelineAPI.getPage(action.payload);
  }),
  UPSERT: new TimelineAction<ITimelineSave>('Save or update a TimelineEntry', (context, action) => {
    return timelineAPI.save(action.payload);
  }),
  DELETE: new TimelineAction<ITimelineRemove>('Delete a TimelineEntry', (context, action) => {
    return timelineAPI.remove(action.payload);
  }),
};