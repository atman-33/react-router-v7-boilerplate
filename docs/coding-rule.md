# コーディング規約

## 共通ルール

### ファイル命名規則

- すべて **ケバブケース（kebab-case）** で統一すること。

e.g.  

```sh
button.tsx
auth-utils.ts
```

### 関数の記述方法

- TypeScript の関数は **アロー関数** で記述すること。

### メソッド命名規則

#### `handle〇〇`（イベントハンドラの命名）

- ボタンやフォームのイベントを処理するメソッドは `handle + 対象 + Event内容` の形式で命名すること。

e.g.  

```tsx
const handleSubmitForm = () => { /* 処理 */ };
const handleClickButton = () => { /* 処理 */ };
```

---

## React に関するルール

### React RouterでActionを呼び出す場合の使い分け

- **通常のフォーム送信（ページ遷移あり）** → `<Form>` + `<button>`
- **非同期リクエストでページ遷移なし（AJAX）** → `fetcher.Form` or `fetcher.submit`
- **ボタンクリックなどで `action` を呼び出す（ページ遷移なし）** → `fetcher.submit`
- **プログラム的に `<Form>` を送信したい（ページ遷移あり）** → `useSubmit`

---

## UIコンポーネント

### ボタン（Button）

#### `variant` の使い分け

ボタンの **`variant`** を以下のルールで使い分ける。

| 種類 | 用途 | 例 |
|------|------|----|
| **通常ボタン (`default`)** | 主要アクション | 作成、編集、送信、保存 |
| **セカンダリーボタン (`secondary`)** | 補完的なアクション | 詳細、次へ、追加の設定 |
| **破壊的ボタン (`destructive`)** | 取り返しのつかないアクション（警告が必要） | 削除、アカウント削除、データ消去 |
| **アウトラインボタン (`outline`)** | 補助的なアクション（目立たず控えめ） | キャンセル、戻る、後で保存 |

### ナビリンク（NaviLink）

`isActive`と`isPending`に対するスタイルを以下のルールで使い分ける。

- isActive = true: 濃い色の文字、背景色有り
- isActive = false & isPending = true: 薄い色の文字
- isActive = false & isPending = false: デフォルト色の文字

e.g.  

```tsx
className={({ isActive, isPending }) =>
  isActive
    ? 'rounded-lg bg-blue-600 font-bold text-white'
    : isPending
      ? 'text-blue-400'
      : 'text-primary'
}
```

---

## 記述例

書き方は、以下の例を参考にすること。

### route.tsx

#### サーバーデータローディング

```tsx
import type { Route } from "./+types/route";
import { fakeDb } from "../db";

export const loader = async({ params }: Route.LoaderArgs) => {
  const product = await fakeDb.getProduct(params.pid);
  return product;
}

const Product = ({
  loaderData,
}: Route.ComponentProps) => {
  const { name, description } = loaderData;
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}

export default Product;
```

### Storybook

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
    asChild: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Button',
  },
};
```
