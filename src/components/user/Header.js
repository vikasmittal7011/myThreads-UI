import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AiOutlineInstagram } from 'react-icons/ai';
import { CgMoreO } from 'react-icons/cg';
import { Link as NavLink } from 'react-router-dom';

import useToastBox from '../../hooks/useToastBox';

const Header = ({ user, handleFollowAndUnfollow, loading }) => {
  const id = localStorage.getItem('id');
  const { showToast } = useToastBox();

  const copyURL = () => {
    const currentLocation = window.location.href;
    navigator.clipboard.writeText(currentLocation).then(() => {
      showToast('URL is copyed', currentLocation);
    });
  };

  return (
    <VStack alignItems={'start'} gap={4}>
      <Flex justifyContent={'space-between'} w="full">
        <Box>
          <Text fontWeight={'bold'} fontSize="2xl">
            {user?.name}
          </Text>
          <Flex alignItems="center" gap={2}>
            <Text fontSize="sm">{user?.username}</Text>
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
          <Avatar src={user?.image} size={'xl'} name={user?.name} />
        </Box>
      </Flex>
      <Text fontSize="xl">{user?.bio}</Text>
      {user?.id === id ? (
        <Button>
          <NavLink to="/update-profile">Update Profile</NavLink>
        </Button>
      ) : (
        <Button onClick={handleFollowAndUnfollow} isDisabled={loading}>
          {user?.followers?.includes(id) ? 'UnFollow' : 'Follow'}
        </Button>
      )}
      <Flex width={'full'} justifyContent={'space-between'}>
        <Flex gap={2} alignItems={'center'}>
          <Text fontSize="md" color={'gray.light'}>
            {user?.followers?.length} Follow
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
