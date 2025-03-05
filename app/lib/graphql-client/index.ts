import { ClientError, GraphQLClient } from 'graphql-request';
import { env } from '~/config/env';

/**
 * オプションのリクエストヘッダーを使用してGraphQLクライアントを初期化します。
 *
 * @param {Request | undefined} [request] - ヘッダーを抽出するためのオプションのリクエストオブジェクト。
 * @returns {Promise<GraphQLClient>} 初期化されたGraphQLクライアントを解決するPromise。
 * @example
 * ```typescript
 * const client = await initializeClient(request);
 * ```
 */
export const initializeClient = async (
  request: Request | undefined = undefined,
) => {
  const headers: Record<string, string> = {};

  if (request) {
    try {
      // 特定の重要なヘッダーのみを選択的に追加
      const selectHeaders = [
        // NOTE: cookieはGraphQLサーバーでユーザー情報取得に必要
        'cookie',
      ];

      for (const headerName of selectHeaders) {
        const headerValue = request.headers.get(headerName);
        if (headerValue) {
          headers[headerName] = headerValue;
        }
      }
    } catch (error) {
      console.error('An error occurred while retrieving headers:', error);
    }
  }

  // GraphQLClientの初期化
  const client = new GraphQLClient(env.API_GQL_URL, {
    fetch: fetch,
    headers: {
      // NOTE: Content-Typeを指定しないとGqphQLの構文エラーとなる。
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  return client;
};

/**
 * `ClientError`インスタンスから元のエラーメッセージを抽出します。
 *
 * @param error - 元のエラーメッセージを抽出する`ClientError`インスタンス。
 * @returns 元のエラーメッセージが存在する場合はそれを返し、存在しない場合は`null`を返します。
 */
export const getOriginalErrorMessage = (error: ClientError): string | null => {
  if (error instanceof ClientError) {
    const originalError = error.response?.errors?.[0]?.extensions
      ?.originalError as { message: string } | undefined;

    if (originalError?.message) {
      return originalError.message;
    }
  }
  return null;
};
