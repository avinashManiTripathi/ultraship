import { employeeResolvers } from './employeeResolvers';
import { authResolvers } from './authResolvers';

export const resolvers = {
  Query: {
    ...employeeResolvers.Query,
    ...authResolvers.Query,
  },
  Mutation: {
    ...employeeResolvers.Mutation,
    ...authResolvers.Mutation,
  },
};

