import type { ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router';

interface ButtonLinkProps extends LinkProps {
  disabled?: boolean;
  children: ReactNode;
}

/**
 * ButtonLink コンポーネントは、リンクのように振る舞うボタンのスタイルを適用する `Link` コンポーネントです。
 * `disabled` 状態でリンクが無効になり、`pointer-events-none` と `opacity-50` を適用します。
 * また、`Button asChild` と組み合わせて使うことで、`Button` のスタイルを持った `Link` を作成できます。
 *
 * 使用例:
 * ```tsx
 * <Button asChild>
 *   <ButtonLink to="/previous" disabled={!data.previous}>
 *     Previous
 *   </ButtonLink>
 * </Button>
 * ```
 */
const ButtonLink = ({
  disabled = false,
  className = '',
  children,
  ...props
}: ButtonLinkProps) => {
  const combinedClassName =
    `${className} ${disabled ? 'pointer-events-none opacity-50' : ''}`.trim();

  return (
    <Link
      {...props}
      to={disabled ? '' : props.to}
      className={combinedClassName}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      {children}
    </Link>
  );
};

export { ButtonLink };
