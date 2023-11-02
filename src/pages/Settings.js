import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import NavBar from '../components/common/NavBar';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import useFetchApiCall from '../hooks/useFetchApiCall';
import useToastBox from '../hooks/useToastBox';
import { useEffect, useState } from 'react';

const Settings = () => {
  const userInfo = useRecoilValue(userAtom);
  const { apiCall } = useFetchApiCall();
  const { showToast } = useToastBox();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [user, setUser] = useState('nothing');
  const [loading, setLoading] = useState(false);

  const handleFreezeAccount = async () => {
    setLoading(true);
    const response = await apiCall('user/freeze', 'PATCH');
    setUser(response.user);
    showToast(
      response.user.freeze
        ? 'Your account is successfully freeze'
        : 'Your account is successfully unfreeze'
    );
    setLoading(false);
  };

  const fetchUserProfile = async () => {
    const response = await apiCall(`user/profile/${userInfo?.username}`);
    if (response.success || response) {
      setUser(response.user);
    } else {
      setUser('Not found');
    }
  };

  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} mx="2">
        <ModalOverlay />
        <ModalContent>
          <ModalBody>Are you sure, you want freeze your account?</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose} size="sm">
              No
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                handleFreezeAccount();
                onClose();
              }}
              size="sm"
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <NavBar />
      <Text my="1" fontWeight="bold">
        Freeze Your Account
      </Text>
      <Text my="1">You can unfreeze your account anytime by logging in.</Text>
      {user.freeze && (
        <Button
          colorScheme="green"
          size="sm"
          onClick={handleFreezeAccount}
          isLoading={loading}
        >
          UnFreeze
        </Button>
      )}
      {!user.freeze && (
        <Button
          colorScheme="red"
          size="sm"
          onClick={onOpen}
          isLoading={loading}
        >
          Freeze
        </Button>
      )}
    </>
  );
};

export default Settings;
