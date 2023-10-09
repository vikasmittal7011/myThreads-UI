import { FormControl, FormLabel, Text, Textarea } from '@chakra-ui/react';

const TextAreaBox = ({
  isRequired = true,
  label,
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
      <Textarea
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

export default TextAreaBox;
