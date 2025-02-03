# コーディング規約

## 共通

- TypeScriptの関数は、アロー関数で記述すること。

## ボタン

### `variant`使い分け

- 通常ボタン（e.g. New, Edit, Save）: default
- 注意ボタン（e.g. Delete）: destructive
- キャンセルボタン（e.g. Cancel）: outline

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
