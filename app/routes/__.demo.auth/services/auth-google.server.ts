import type { OAuth2Tokens } from 'arctic';
import { OAuth2Strategy } from 'remix-auth-oauth2';

/**
 * @see https://developers.google.com/identity/protocols/oauth2/scopes
 */
export type GoogleScope = string;

export type GoogleStrategyOptions = {
  /** Google API クライアントID */
  clientId: string;
  /** Google API クライアントシークレット */
  clientSecret: string;
  /** 認証後のリダイレクト先 */
  redirectURI: string;
  /**
   * OAuthスコープ（アクセス許可範囲）
   * @default ["openid", "profile", "email"]
   */
  scopes?: GoogleScope[];
  /**
   * オフラインならリフレッシュトークンを取得
   * - 'online': リフレッシュトークンを取得しない
   * - 'offline': リフレッシュトークンを取得
   */
  accessType?: 'online' | 'offline';
  /** 追加スコープを許可するかどうか */
  includeGrantedScopes?: boolean;
  /**
   * 認証画面の挙動
   * - 'none': ユーザーへの確認を行わない
   * - 'consent': 同意画面を表示
   * - 'select_account': アカウント選択画面を表示
   */
  prompt?: 'none' | 'consent' | 'select_account';
  /** ホストドメイン制限（Google Workspace向け） */
  hd?: string;
  /** ユーザー名のヒント（事前入力用） */
  loginHint?: string;
};

export type GoogleProfile = {
  /** ユーザーの一意ID */
  id: string;
  /** ユーザーの表示名 */
  displayName: string;
  /** 名前情報 */
  name: {
    /** 姓 */
    familyName: string;
    /** 名 */
    givenName: string;
  };
  /** メールアドレス */
  emails: [{ value: string }];
  /** プロフィール画像 */
  photos: [{ value: string }];
  /** APIの生データ */
  _json: {
    /** ユーザーID（Google固有の一意識別子） */
    sub: string;
    /** フルネーム */
    name: string;
    /** 名 */
    given_name: string;
    /** 姓 */
    family_name: string;
    /** プロフィール画像URL */
    picture: string;
    /** ユーザーのロケール情報（例: ja, en） */
    locale: string;
    /** メールアドレス */
    email: string;
    /** メールアドレスの確認ステータス */
    email_verified: boolean;
    /** ユーザーの所属するドメイン（Google Workspace用） */
    hd: string;
  };
};

export type GoogleExtraParams = {
  /** アクセストークンの有効期限（秒） */
  expires_in: number;
  /** トークンの種類 */
  token_type: 'Bearer';
  /** 取得したスコープ（スペース区切りの文字列） */
  scope: string;
  /** IDトークン（JWT形式） */
  id_token: string;
} & Record<string, string | number>;

export const GoogleStrategyDefaultScopes = [
  'openid',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];
export const GoogleStrategyDefaultName = 'google';

export class GoogleStrategy<User> extends OAuth2Strategy<User> {
  public name = GoogleStrategyDefaultName;

  private readonly accessType: string;

  private readonly prompt?: 'none' | 'consent' | 'select_account';

  private readonly includeGrantedScopes: boolean;

  private readonly hd?: string;

  private readonly loginHint?: string;

  private readonly userInfoURL =
    'https://www.googleapis.com/oauth2/v3/userinfo';

  constructor(
    {
      clientId,
      clientSecret,
      redirectURI,
      scopes,
      accessType,
      includeGrantedScopes,
      prompt,
      hd,
      loginHint,
    }: GoogleStrategyOptions,
    verify: OAuth2Strategy<User>['verify'],
  ) {
    super(
      {
        clientId,
        clientSecret,
        redirectURI,
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
        scopes: scopes ?? GoogleStrategyDefaultScopes,
      },
      verify,
    );
    this.accessType = accessType ?? 'online';
    this.includeGrantedScopes = includeGrantedScopes ?? false;
    this.prompt = prompt;
    this.hd = hd;
    this.loginHint = loginHint;
  }

  protected authorizationParams(
    params: URLSearchParams,
    _request?: Request,
  ): URLSearchParams {
    params.set('access_type', this.accessType);
    params.set('include_granted_scopes', String(this.includeGrantedScopes));
    if (this.prompt) {
      params.set('prompt', this.prompt);
    }
    if (this.hd) {
      params.set('hd', this.hd);
    }
    if (this.loginHint) {
      params.set('login_hint', this.loginHint);
    }
    return params;
  }

  protected async userProfile(tokens: OAuth2Tokens): Promise<GoogleProfile> {
    const response = await fetch(this.userInfoURL, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch user profile: ${response.statusText}`);
    }
    const raw: GoogleProfile['_json'] = await response.json();
    const profile: GoogleProfile = {
      id: raw.sub,
      displayName: raw.name,
      name: {
        familyName: raw.family_name,
        givenName: raw.given_name,
      },
      emails: [{ value: raw.email }],
      photos: [{ value: raw.picture }],
      _json: raw,
    };
    return profile;
  }
}
