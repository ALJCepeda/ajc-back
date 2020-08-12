import { Mutation } from '@/models/Mutation';

export default function generateMutations(module:any, mutations:{ [key:string]:Mutation<any, any> }) {
  const moduleMutations = {};

  for (const key in mutations) {
    const mutation = mutations[key];
    moduleMutations[mutation.type] = mutation.handler;
  }

  module.mutations = {
    ...module.mutations,
    ...moduleMutations
  };

  return module;
}
