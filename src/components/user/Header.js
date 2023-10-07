import {
  Avatar,
  Box,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { AiOutlineInstagram } from 'react-icons/ai';
import { CgMoreO } from 'react-icons/cg';

const Header = () => {
  const toast = useToast();

  const copyURL = () => {
    const currentLocation = window.location.href;
    navigator.clipboard.writeText(currentLocation).then(() => {
      toast({
        title: 'URL is copyed',
        description: currentLocation,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    });
  };

  return (
    <VStack alignItems={'start'} gap={4}>
      <Flex justifyContent={'space-between'} w="full">
        <Box>
          <Text fontWeight={'bold'} fontSize="2xl">
            Name of user
          </Text>
          <Flex alignItems="center" gap={2}>
            <Text fontSize="sm">username of user</Text>
            <Text
              fontSize="xs"
              bg={'gray.dark'}
              color={'gray.light'}
              p={1}
              borderRadius={'xl'}
            >
              tag
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU"
            size={'xl'}
            name="random"
          />
        </Box>
      </Flex>
      <Text fontSize="xl">Description of user</Text>
      <Flex width={'full'} justifyContent={'space-between'}>
        <Flex gap={2} alignItems={'center'}>
          <Text fontSize="md" color={'gray.light'}>
            followers
          </Text>
          <Box width={1} height={1} bg={'gray.light'} borderRadius={'full'} />
          <Link cursor={'pointer'} fontSize="md" color={'gray.light'}>
            link
          </Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <AiOutlineInstagram size={24} cursor={'pointer'} />
          </Box>
          <Menu>
            <MenuButton className="icon-container">
              <CgMoreO size={24} cursor={'pointer'} />
            </MenuButton>
            <Portal>
              <MenuList bg={'gary.dark'}>
                <MenuItem bg={'gary.dark'} onClick={copyURL}>
                  Copy Link
                </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </Flex>
      </Flex>
      <Flex width={'full'}>
        <Flex
          flex={1}
          borderBottom={'1.5px solid white'}
          justifyContent={'center'}
          pb={3}
          cursor={'pointer'}
        >
          <Text fontWeight="bold">Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={'1px solid gray'}
          justifyContent={'center'}
          color="gray.light"
          pb={3}
          cursor={'pointer'}
        >
          <Text fontWeight="bold">Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default Header;
