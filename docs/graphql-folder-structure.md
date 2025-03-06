# GraphQL フォルダ構造とモジュールの管理

## モジュール管理のポイント

✅ **エンティティごとに分離** → 拡張性が高く、新規追加が容易  
✅ **DTO, モデル, リゾルバを整理** → 規模が大きくなってもメンテしやすい  
✅ **モジュールのエントリーポイントを統一** → 各エンティティのスキーマ定義を明確にし、依存関係を整理しやすくする

---

## フォルダ構造

```text
app/
  ├── .server/
  │   ├── lib/
  │   │   ├── graphql/
  │   │   │   ├── builder.ts
  │   │   │   ├── context.ts
  │   │   │   ├── modules/
  │   │   │   │   ├── post/
  │   │   │   │   │   ├── dto/
  │   │   │   │   │   │   ├── args/
  │   │   │   │   │   │   │   ├── get-post-args.dto.ts
  │   │   │   │   │   │   ├── input/
  │   │   │   │   │   │   │   ├── create-post-input.dto.ts
  │   │   │   │   │   │   │   ├── update-post-input.dto.ts
  │   │   │   │   │   │   │   ├── delete-post-input.dto.ts
  │   │   │   │   │   ├── post.type.ts
  │   │   │   │   │   ├── post.resolver.ts
  │   │   │   │   │   ├── post.module.ts
  │   │   │   ├── schema.ts
```

---

## フォルダ・ファイルの役割

### `builder.ts`

- Pothos を使用してスキーマを構築するためのエントリーポイント。
- 各モジュールのスキーマを組み合わせ、最終的な GraphQL スキーマを生成する。  

### `context.ts`

- GraphQL のコンテキストオブジェクトを定義。  

### `modules/`

- 各エンティティ（例: `post/`, `user/`）ごとにフォルダを作成。
- それぞれのモジュール内で **DTO、モデル、リゾルバを管理**。  

#### `dto/`

- **GraphQL のデータ転送オブジェクト (DTO)** を定義。
- **`args/`** にはクエリの引数 (`ArgsType`) を定義。
- **`input/`** にはミューテーション用の入力 (`InputType`) を定義。  

#### `post.type.ts`

- GraphQL のオブジェクトタイプを定義。
- `Post` のスキーマや Enum などの型を含む。  

#### `post.resolver.ts`

- クエリやミューテーションのリゾルバを定義。
- `post.query.ts` や `post.mutation.ts` を統合。  

#### `post.module.ts`

- `dto/`, `post.type.ts`, `post.resolver.ts` のエントリーポイント。
- `setupPostModule()` で各コンポーネントを統合し、GraphQL スキーマに登録。  

### `schema.ts`

- すべてのモジュールを統合し、GraphQL サーバーを構築するエントリーポイント。

---

## 各ファイルの実装例

### `builder.ts`

```ts
import SchemaBuilder from '@pothos/core';

export const builder = new SchemaBuilder({
  plugins: [], // 必要に応じてプラグインを追加
});
```

### `context.ts`

```ts
import type { User } from '@prisma/client';
import type { YogaInitialContext } from 'graphql-yoga';

export interface Context extends YogaInitialContext {
  user?: User;
}
```

### `post.module.ts`

```ts
import { definePostType } from './post.type';
import { definePostResolver } from './post.resolver';

export const setupPostModule = () => {
  definePostType();
  definePostResolver();
  console.log('Post module has been defined');
};
```

### `schema.ts`

```ts
import { builder } from './builder';
import { setupPostModule } from './modules/post/post.module';

setupPostModule();

export const schema = builder.toSchema();
```
