import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import useToastBox from '../../hooks/useToastBox';

const ChatMessageInput = ({ handleSendMessage }) => {
  const [textMessage, setTextMessage] = useState('');
  const { showToast } = useToastBox();

  const handleClick = () => {
    if (!textMessage) {
      showToast('Error', 'Enter some message...', 'error');
      return;
    }
    handleSendMessage(textMessage);
    setTextMessage('');
  };

  return (
    <>
      <InputGroup>
        <Input
          placeholder="Type Message"
          w="full"
          onChange={e => {
            setTextMessage(e.target.value);
          }}
          value={textMessage}
        />
        <InputRightElement cursor="pointer" onClick={handleClick}>
          <IoMdSend />
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default ChatMessageInput;
