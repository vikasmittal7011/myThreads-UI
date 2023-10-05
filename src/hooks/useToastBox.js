import { useToast } from '@chakra-ui/react';

const useToastBox = () => {
  const toast = useToast();
  const showToast = (
    title = 'Success',
    description,
    status = 'success',
    isClosable = true,
    duration = 3000
  ) => {
    toast({
      title,
      description,
      status,
      duration,
      isClosable,
    });
  };
  return { showToast };
};

export default useToastBox;
