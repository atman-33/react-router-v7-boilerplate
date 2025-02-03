# コーディング規約

## 共通

- TypeScriptの関数は、アロー関数で記述すること。

## ボタン

### `variant`使い分け

- **通常ボタン (default)**: 主要アクションで、ユーザーが最も頻繁に行う操作
  - **例**: 作成、編集、送信、保存
  - **用途**: 最も重要なアクションを表現し、デフォルトのスタイルで表示される。
- **セカンダリーボタン (secondary)**: 重要でないが、補完的またはサポート的なアクション
  - **例**: 詳細、次へ、追加の設定
  - **用途**: メインアクションを補完し、少し低い優先度の操作。
- **破壊的ボタン (destructive)**: 取り返しのつかないアクションで、警告が必要
  - **例**: 削除、アカウント削除、データ消去
  - **用途**: ユーザーに強い警告を発し、誤操作を防ぐためにデザインが強調される。
- **アウトラインボタン (outline)**: 補助的なアクションで、目立たず控えめに表示
  - **例**: キャンセル、戻る、後で保存
  - **用途**: 主にナビゲーションや補助的な操作を表す。

## 記述方法

書き方は、以下の記述例を参考にすること。

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
