import defaultImage from '/not-found.svg';

interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
}

/**
 * 画像コンポーネント。画像読み込みエラー時はデフォルト画像を表示する。
 * @param param0
 * @returns
 */
const Image = ({ src, alt, className }: ImageProps) => {
  return (
    <img
      src={src || defaultImage}
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
