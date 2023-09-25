import { Flex, Image, useColorMode } from '@chakra-ui/react';

import dark from '../../assets/dark-logo.svg';
import light from '../../assets/light-logo.svg';

const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Flex justifyContent="center" mt={6} mb={12}>
      <Image
        cursor="pointer"
        alt="logo"
        w={6}
        onClick={toggleColorMode}
        src={colorMode === 'light' ? dark : light}
      />
    </Flex>
  );
};

export default NavBar;
