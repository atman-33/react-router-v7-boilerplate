import defaultImage from '../../../../public/not-found.svg';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * 画像コンポーネント。画像読み込みエラー時はデフォルト画像を表示する。
 * （デフォルト画像はSSRでは表示されないため注意）
 * @param param0
 * @returns
 */
const Image = ({ src, alt, className }: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = defaultImage;
      }}
    />
  );
};

export { Image };
