import { useRecoilValue } from 'recoil';
import SignUp from '../components/auth/SignUp';
import NavBar from '../components/common/NavBar';
import authScreenAtom from '../atoms/authAtom';
import SignIn from '../components/auth/SignIn';

const Authentication = () => {
  const authSrceenState = useRecoilValue(authScreenAtom);
  return (
    <>
      <NavBar />
      {authSrceenState === 'login' ? <SignIn /> : <SignUp />}
    </>
  );
};

export default Authentication;
