import { Button, Flex, Image, useColorMode } from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';

import dark from '../../assets/dark-logo.svg';
import light from '../../assets/light-logo.svg';
import useFetchApiCall from '../../hooks/useFetchApiCall';
import useToastBox from '../../hooks/useToastBox';
import { useSetRecoilState } from 'recoil';
import userAtom from '../../atoms/userAtom';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const setUserState = useSetRecoilState(userAtom);

  const navigate = useNavigate();

  const { apiCall } = useFetchApiCall();
  const { showToast } = useToastBox();

  const logout = async () => {
    const response = await apiCall('user/logout', 'POST');
    if (response.success || response) {
      showToast('Sucess', 'Logout successfully');
      localStorage.removeItem('id');
      setUserState(null);
      navigate('/');
    }
  };

  return (
    <Flex justifyContent="space-around" mt={6} mb={12}>
      <Image
        cursor="pointer"
        alt="logo"
        w={6}
        onClick={toggleColorMode}
        src={colorMode === 'light' ? dark : light}
      />
      <Button size={'sm'} onClick={logout}>
        <FiLogOut size={20} />
      </Button>
    </Flex>
  );
};

export default NavBar;
