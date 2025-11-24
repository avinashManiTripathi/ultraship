import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { authenticateToken } from './auth/middleware';

interface Context {
  user?: {
    id: string;
    email: string;
    role: 'admin' | 'employee';
  };
}

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      const user = authenticateToken(token);
      return { user };
    },
  });

  console.log(`🚀 Server ready at: ${url}`);
  console.log(`📊 GraphQL Playground: ${url}`);
}

startServer();

