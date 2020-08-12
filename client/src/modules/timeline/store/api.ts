import { get, post, remove } from '@/services/http'; ;

export const timelineAPI = {
  getPage: get<ITimelinePage>('/timeline'),
  save: post<ITimelineSave>('/timeline'),
  remove: remove<ITimelineRemove>('/timeline')
};
