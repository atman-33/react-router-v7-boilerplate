import { type FieldMetadata, getInputProps } from '@conform-to/react';
import { Input } from '~/components/shadcn/ui/input';

interface ConformInputProps<Schema> {
  metadata: FieldMetadata<Schema>;
  options: {
    type:
      | 'number'
      | 'search'
      | 'color'
      | 'date'
      | 'datetime-local'
      | 'email'
      | 'file'
      | 'hidden'
      | 'month'
      | 'password'
      | 'range'
      | 'tel'
      | 'text'
      | 'time'
      | 'url'
      | 'week';
    value?: boolean | undefined;
  };
  placeholder?: string | undefined;
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  className?: string | undefined;
}

/**
 * Conformに対応したインプット
 * @param param0
 * @returns
 */
const ConformInput = <Schema,>({
  metadata,
  options,
  placeholder,
  value,
  onChange: handleInputChange,
  className,
}: ConformInputProps<Schema>) => {
  const inputProps = getInputProps(metadata, options);

  return (
    <div className="flex flex-col">
      <Input
        {...inputProps}
        placeholder={placeholder}
        className={`${className} ${!!metadata.errors && 'border-red-500'}`}
        value={value}
        onChange={handleInputChange}
      />
      {metadata.errors && (
        <div>
          {metadata.errors.map((e, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <p key={index} className="py-2 text-red-500">
              {e}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export { ConformInput };
