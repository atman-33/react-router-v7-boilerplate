# **コーディング規約**

## **1. 共通ルール**

### **1.1 ファイル命名規則**

- すべて **ケバブケース（kebab-case）** で統一すること。

**例:**

```sh
button.tsx
auth-utils.ts
```

### **1.2 関数の記述方法**

- TypeScript の関数は **アロー関数** で記述すること。

### **1.3 メソッド命名規則**

#### **`handle〇〇`（イベントハンドラの命名）**

- ボタンやフォームのイベントを処理するメソッドは `handle + 対象 + Event内容` の形式で命名すること。

**例:**

```tsx
const handleSubmitForm = () => { /* 処理 */ };
const handleClickButton = () => { /* 処理 */ };
```

---

## **2. React に関するルール**

### **2.1 React Router**

- `action` を呼び出す際、クライアントサイドでは **`useFetcher` と `fetcher.Form` を使用すること**。
- **理由:** `<Form>` の `submit` では `submitting/loading` の状態を取得できないため。

---

## **3. UIコンポーネント**

### **3.1 ボタン（Button）**

#### **3.1.1 `variant` の使い分け**

ボタンの **`variant`** を以下のルールで使い分ける。

| 種類 | 用途 | 例 |
|------|------|----|
| **通常ボタン (`default`)** | 主要アクション | 作成、編集、送信、保存 |
| **セカンダリーボタン (`secondary`)** | 補完的なアクション | 詳細、次へ、追加の設定 |
| **破壊的ボタン (`destructive`)** | 取り返しのつかないアクション（警告が必要） | 削除、アカウント削除、データ消去 |
| **アウトラインボタン (`outline`)** | 補助的なアクション（目立たず控えめ） | キャンセル、戻る、後で保存 |

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
