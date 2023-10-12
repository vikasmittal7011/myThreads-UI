import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { IoMdSend } from 'react-icons/io';

const ChatMessageInput = () => {
  return (
    <>
      <InputGroup>
        <Input placeholder="Type Message" w="full" />
        <InputRightElement cursor="pointer">
          <IoMdSend />
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default ChatMessageInput;
