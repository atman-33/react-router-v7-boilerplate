/**
 * シングルトンパターンを実装するための関数。
 * 指定された名前とファクトリ関数を使用して、グローバルスコープに一度だけ値を生成します。
 *
 * @param name シングルトンの名前。
 * @param valueFactory 値を生成するためのファクトリ関数。
 * @returns 生成されたシングルトンの値。
 */
export const singleton = <Value>(
  name: string,
  valueFactory: () => Value,
): Value => {
  const globalForSingletons = global as typeof global & {
    __singletons?: Record<string, unknown>;
  };

  globalForSingletons.__singletons ??= {};
  if (!(name in globalForSingletons.__singletons)) {
    globalForSingletons.__singletons[name] = valueFactory();
  }

  return globalForSingletons.__singletons[name] as Value;
};
