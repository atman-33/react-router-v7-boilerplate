# プロジェクト構造

## React Router

`app`フォルダ直下は、下記のようなフォルダ構造とする。

```sh
public                # 画像、フォントなどの静的ファイルが含まれるフォルダ
|
app
|
+-- .server           # サーバーサイドで利用する各モジュール。構成はappフォルダと同様
|   |
|   +-- lib           # サーバーサイド向けに事前構成された再利用可能なライブラリ
|   |
|   +-- utils         # サーバーサイド向けの共有ユーティリティ関数
|   |
|   +-- services      # 外部APIやデータベース操作など、サーバーサイドでしか実行できないビジネスロジック
|   |
|   ...
|
+-- components        # アプリケーション全体で共有されるコンポーネント
|
+-- config            # グローバルな設定、環境変数などはここからエクスポートされ、アプリ内で使用される。
|
+-- constants         # グローバルな定数
|
+-- hooks             # アプリケーション全体で共有されるフック
|
+-- lib               # アプリケーション向けに事前構成された再利用可能なライブラリ
|
+-- providers         # アプリケーション全体で共有されるプロバイダ
|
+-- routes            # React Router用ルーティングディレクトリ。詳細は後述
|
+-- services          # アプリケーション全体で共有されるビジネスロジック
|
+-- stores            # グローバルな状態ストア
|
+-- testing           # テストユーティリティとモックサーバ
|
+-- types             # アプリケーション全体で使用される基本タイプ
|
+-- utils             # 共有ユーティリティ関数
|
+-- sessions.server.ts  # セッションストレージ
```

### app/components

`components`直下は、コンポーネントファイルを配置する。必要に応じてフォルダを準備すること。

```sh
app/components
|
+-- shadcn
|   |
|   +-- custom          # shadcn/uiコンポーネントのカスタマイズUI
|   |
|   +-- ui              # shadcn/uiコンポーネント
|       |
|       +-- button.tsx
|       ...
|
+-- shared              # カスタムの共通コンポーネント       
    |
    +-- comform         # conformライブラリ専用コンポーネント用フォルダ
    |
    +-- image.tsx
    +-- loading-dots.tsx

    ...
```

### lib

`lib`直下にはフォルダを配置し、各フォルダ内にエクスポート用の`index.ts`ファイルを配置する。

```sh
app/lib
|
+-- module-a
|   |
|   +-- index.ts  # 外部ファイルから参照する場合、このindex.tsファイル経由でimportする
|   +-- xxx.ts
|   +-- yyy.tx
|
+-- module-b
```

## routes

コロケーションを活用して、レイアウトとページの各フォルダに関連するファイルを集約する。

```sh
app/routes/_app._index
|
+-- assets      # 特定の機能に関連する静的ファイルが含まれるフォルダ
|
+-- components  # 特定の機能にスコープが限定されたコンポーネント
|
+-- constants   # 特定の機能に関連する定数
|
+-- hooks       # 特定の機能にスコープが限定されたフック
|
+-- services    # 特定の機能のサービス（ビジネスロジック）
|
+-- stores      # 特定の機能の状態ストア
|
+-- types       # TS特有の機能ドメイン用のTypeScriptタイプ
|
+-- utils       # 特定の機能用のユーティリティ関数
```

e.g.  

```sh
app/routes
|
+-- _app                # アプリ全体のレイアウト&共通ファイル
|   |
|   +-- route.tsx       # レイアウトファイル
|   
+-- _app.index          # アプリのトップページ
|   |
|   +-- route.tsx       # ページファイル
|   
+-- _app.todos          # （例）todosのレイアウト&todos全体の共通ファイル
|   |
|   +-- components      # レイアウトで利用するコンポーネント
|   |
|   +-- types           # todos全体に共通する型定義
|   |
|   +-- route.tsx       # レイアウトファイル
|
+-- _app.totos._index   # （例）todosのトップページ
|   |
|   +-- components      # ページで利用するコンポーネント
|   |
|   +-- route.tsx       # ページファイル
|
+-- _app.todos.$todoId.edit._index  # （例）todosのIDに対する編集ページ
|   |
|   +-- components      # ページで利用するコンポーネント
|   |
|   +-- hooks           # ページで利用するフック
|   |
|   +-- stores          # ページで利用するストア情報
|   |
|   +-- route.tsx       # ページファイル
|
+-- _app.todos.$todoId_.delete      # （例）todosのIDを削除するリソースルート
    |
    +-- route.tsx       # リソースルートファイル
```

## 参考

- [alan2207/bulletproof-react: 🛡️ ⚛️ A simple, scalable, and powerful architecture for building production ready React applications.](https://github.com/alan2207/bulletproof-react)
