import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../stores/authContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const { pathname } = useLocation();

  /**
   * @TODO 임시 주석 처리
   */
  // if (!isLoggedIn) {
  //   return <Navigate to='/login' replace state={{ from: pathname }} />;
  // }

  return children;
};

export default PrivateRoute;
