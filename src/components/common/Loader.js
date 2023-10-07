import { Flex, Image, useColorMode } from '@chakra-ui/react';

import loaderDark from '../../assets/loaderDark.gif';
import loaderLight from '../../assets/loaderLight.gif';

const Loader = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex justifyContent="center" alignContent="center">
      <Image
        src={colorMode === 'light' ? loaderDark : loaderLight}
        name="Loading..."
        w="20"
      />
    </Flex>
  );
};

export default Loader;
