import {
  Box,
  CloseButton,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { BsFillImageFill } from 'react-icons/bs';
import useToastBox from '../../hooks/useToastBox';
import usePreviewImg from '../../hooks/useImagePreview';

const ChatMessageInput = ({ handleSendMessage, loading }) => {
  const { onClose } = useDisclosure();
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const imageRef = useRef();
  const [textMessage, setTextMessage] = useState('');
  const { showToast } = useToastBox();

  const handleClick = () => {
    if (!textMessage && !imgUrl) {
      showToast('Error', 'Enter some message...', 'error');
      return;
    }
    handleSendMessage(textMessage, imgUrl);
    setTextMessage('');
  };

  useEffect(() => {
    if (!loading) setImgUrl('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      <Flex gap={2} alignItems="center" m={2}>
        <Flex flex={5} cursor="pointer">
          <Box onClick={() => imageRef.current.click()}>
            <BsFillImageFill size={30} />
          </Box>
          <Input
            type="file"
            name="image"
            hidden
            ref={imageRef}
            onChange={handleImageChange}
          />

          <Modal isOpen={imgUrl} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalBody>
                {imgUrl && (
                  <Flex mt="5" width="full" position="relative">
                    <Image src={imgUrl} name="Selected Pic" />
                    <CloseButton
                      onClick={() => {
                        setImgUrl('');
                      }}
                      bg="gray.800"
                      position="absolute"
                      top="2"
                      right="2"
                    />
                  </Flex>
                )}
              </ModalBody>

              <ModalFooter>
                <Flex
                  justifyContent="flex-end"
                  cursor="pointer"
                  onClick={handleClick}
                >
                  {loading ? (
                    <Spinner size="md" />
                  ) : (
                    <IoMdSend size="24" cursor="pointer" />
                  )}
                </Flex>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>

        <Flex flex={95}>
          <InputGroup>
            <Input
              placeholder="Type Message"
              w="full"
              onChange={e => {
                setTextMessage(e.target.value);
              }}
              value={textMessage}
            />
            <InputRightElement>
              <IoMdSend cursor="pointer" onClick={handleClick} />
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Flex>
    </>
  );
};

export default ChatMessageInput;
