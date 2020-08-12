import generateActions from '@/services/functions/generateActions';
import { Module } from 'vuex';
import { TimelineActions } from '@/modules/timeline/store/actions';

const module:Module<TimelineModuleState, AppState> = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {}
};

generateActions(module, TimelineActions);

export default module;
