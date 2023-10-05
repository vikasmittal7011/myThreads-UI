import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const PasswordBox = ({ value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input
          type={showPassword ? 'text' : 'password'}
          onChange={e => {
            onChange('password', e.target.value);
          }}
          value={value}
        />
        <InputRightElement h={'full'}>
          <Button
            variant={'ghost'}
            onClick={() => setShowPassword(showPassword => !showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Text textAlign="start" fontSize="md" textColor="red.500">
        {error}
      </Text>
    </FormControl>
  );
};

export default PasswordBox;
