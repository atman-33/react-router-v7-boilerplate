import { Input } from '../shadcn/ui/input';

interface SearchInputProps {
  value: string;
  onInputChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onInputChange,
}) => {
  const handleCancelClick = () => {
    onInputChange('');
  };

  return (
    <div className="relative">
      <Input
        className="pr-8 pl-8"
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
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
