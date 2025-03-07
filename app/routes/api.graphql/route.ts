import { createYoga } from 'graphql-yoga';
import { schema } from '~/.server/lib/graphql/schema';
import { getSession } from '~/sessions.server';
import type { Route } from './+types/route';

// NOTE: createYogaで生成したインスタンスはシングルトンとして利用される。
const yoga = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql', // GraphQL のエンドポイントを指定
  context: async (ctx) => {
    // ログイン中のユーザー取得
    const session = await getSession(ctx.request.headers.get('Cookie'));
    const user = session.get('user');
    // console.log(user);
    return { ...ctx, user };
  },
});

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const response = await yoga.handleRequest(request, context);
  return new Response(response.body, response);
};

export const action = async ({ request, context }: Route.ActionArgs) => {
  const response = await yoga.handleRequest(request, context);
  return new Response(response.body, response);
};
