import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

const InputBox = ({
  isRequired = true,
  label,
  type = 'text',
  onChange,
  placeholder,
  name,
  value,
  error,
}) => {
  const handleChnage = e => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <FormControl isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={handleChnage}
        placeholder={placeholder}
      />
      <Text textAlign="start" fontSize="md" textColor="red.500">
        {error}
      </Text>
    </FormControl>
  );
};

export default InputBox;
