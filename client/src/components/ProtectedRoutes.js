
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';

const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [authChecked, setAuthChecked] = useState(false); // 👈 flag to prevent premature rendering

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/getUserData',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      dispatch(hideLoading());

      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.removeItem('token');
      console.log('Error in ProtectedRoutes:', error);
    } finally {
      setAuthChecked(true); // ✅ done checking
    }
  };

  useEffect(() => {
    if (!user && localStorage.getItem('token')) {
      getUser();
    } else {
      setAuthChecked(true); // ✅ already have user
    }
  }, [user]);

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  // ⛔ Don't render anything until auth check is complete
  if (!authChecked) {
    return null;
  }

  return children;
};

export default ProtectedRoutes;
