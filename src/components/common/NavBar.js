import { Button, Flex, Image, Link, useColorMode } from '@chakra-ui/react';
import { useNavigate, Link as NavLink } from 'react-router-dom';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { BsFillChatQuoteFill } from 'react-icons/bs';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import dark from '../../assets/dark-logo.svg';
import light from '../../assets/light-logo.svg';

import userAtom from '../../atoms/userAtom';
import CreatePost from '../../pages/CreatePost';
import useToastBox from '../../hooks/useToastBox';
import useFetchApiCall from '../../hooks/useFetchApiCall';

const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const setUserState = useSetRecoilState(userAtom);
  const user = useRecoilValue(userAtom);

  const navigate = useNavigate();

  const { apiCall } = useFetchApiCall();
  const { showToast } = useToastBox();

  const logout = async () => {
    const response = await apiCall('user/logout', 'POST');
    if (response.success || response) {
      showToast('Sucess', 'Logout successfully');
      localStorage.removeItem('user');
      setUserState(null);
      navigate('/');
    }
  };

  return (
    <Flex justifyContent="space-around" alignItems="center" mt={6} mb={12}>
      <Image
        cursor="pointer"
        alt="logo"
        w={6}
        onClick={toggleColorMode}
        src={colorMode === 'light' ? dark : light}
      />

      {user && (
        <>
          <Link as={NavLink} to="/">
            <AiFillHome size={24} />
          </Link>
          <Link as={NavLink} to={`/${user.username}`}>
            <CgProfile size={24} />
          </Link>
          <Link as={NavLink} to={`/search`}>
            <AiOutlineSearch size={24} />
          </Link>
          <Link as={NavLink} to={`/chat`}>
            <BsFillChatQuoteFill size={20} />
          </Link>
          <Link as={NavLink} to={`/setting`}>
            <FiSettings size={20} />
          </Link>
          <Button size={'sm'} onClick={logout}>
            <FiLogOut size={20} />
          </Button>
          <CreatePost />
        </>
      )}
    </Flex>
  );
};

export default NavBar;
