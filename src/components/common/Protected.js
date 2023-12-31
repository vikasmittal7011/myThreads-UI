import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';
import { Navigate } from 'react-router-dom';

const Protected = ({ children }) => {
  const user = useRecoilValue(userAtom);

  if (!user) return <Navigate to="/auth" />;

  return children;
};

export default Protected;
