import { Action } from '@/models/Action';

export default function generateActions(module:any, actions:{ [key:string]:Action<any, any, any> }) {
  const moduleActions = {};

  for (const key in actions) {
    const action = actions[key];
    moduleActions[action.task] = action.handler;
  }

  module.actions = {
    ...module.actions,
    ...moduleActions
  };

  return module;
}
