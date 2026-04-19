import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Main from '@root/layout/main-layout/Main';
import Login from '@pages/login/Login';
import Register from '@pages/register/Register';
import ForgetPassword from '@pages/forgot-password/ForgotPassword';
import RecoverPassword from '@pages/recover-password/RecoverPassword';
import { useWindowSize } from '@shared/hooks/useWindowSize';
import { calculateWindowSize } from '@shared/lib/utils/helpers';
import { setWindowSize } from '@store/reducers/ui';

import Dashboard from '@root/layout/main-layout/Dashboard';
import Blank from '@root/layout/main-layout/Blank';
import SubMenu from '@root/layout/main-layout/SubMenu';
import Profile from '@pages/profile/Profile';

import PublicRoute from '@routes/PublicRoute';
import PrivateRoute from '@routes/PrivateRoute';
import { setCurrentUser } from '@store/reducers/auth';

import { firebaseAuth } from './shared/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '@store/store';
import { Loading } from '@shared/ui/components/Loading';

const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useAppSelector((state) => state.ui.screenSize);
  const dispatch = useAppDispatch();

  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(
      firebaseAuth,
      (user) => {
        if (user) {
          dispatch(setCurrentUser(user));
        } else {
          dispatch(setCurrentUser(null));
        }
        setIsAppLoading(false);
      },
      (e) => {
        console.log(e);
        dispatch(setCurrentUser(null));
        setIsAppLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  if (isAppLoading) {
    return <Loading />;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/register" element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/forgot-password" element={<PublicRoute />}>
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Route>
        <Route path="/recover-password" element={<PublicRoute />}>
          <Route path="/recover-password" element={<RecoverPassword />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Main />}>
            <Route path="/sub-menu-2" element={<Blank />} />
            <Route path="/sub-menu-1" element={<SubMenu />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </>
  );
};

export default App;
