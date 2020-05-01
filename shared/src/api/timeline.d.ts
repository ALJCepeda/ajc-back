type ITimelinePage = IEndpoint<IPaginationContext, ITimelineEntry[]>;
type ITimelineSave = IEndpoint<ITimelineEntry, ITimelineEntry>;
type ITimelineRemove = IEndpoint<number, boolean>;
