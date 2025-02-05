import { Input } from '../shadcn/ui/input';

interface SearchInputProps {
  id?: string | undefined;
  name?: string | undefined;
  type?: React.HTMLInputTypeAttribute | undefined;
  value?: string | number | readonly string[] | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
  placeholder?: string | undefined;
  onInputChange?: (value: string) => void;
}

/**
 * 検索用インプット。
 * 入力クリアボタン（✖）を利用する際は、idを設定すること。
 * @param param0
 * @returns
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  id,
  name,
  type,
  value,
  defaultValue,
  placeholder,
  onInputChange,
}) => {
  const handleCancelClick = () => {
    if (!id) {
      return;
    }

    const input = document.getElementById(id);
    if (input instanceof HTMLInputElement) {
      input.value = '';
    }
  };

  return (
    <div className="relative">
      <Input
        className="pr-8 pl-8"
        id={id}
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue || ''}
        placeholder={placeholder}
        onChange={(e) => onInputChange?.(e.target.value)}
      />
      <div className="absolute inset-y-0 left-1 flex items-center">
        <span className="text-lg">🔍</span>
      </div>
      <button
        type="button"
        className="absolute inset-y-0 right-2"
        onClick={handleCancelClick}
      >
        ❌
      </button>
    </div>
  );
};
