import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const withAuth = (Component, requiredRole = null) => {
  return (props) => {
    const { user, token } = useSelector((state) => state.auth);

    if (!token || !user) {
      return <Redirect to="/login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
      return <Redirect to="/vacancies" />;
    }

    return <Component {...props} />;
  };
};

export default withAuth;