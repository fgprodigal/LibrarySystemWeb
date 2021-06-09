import React from 'react';
import { useModel, Access, Redirect } from 'umi';

export default ({ children, location }) => {
  const { initialState } = useModel('@@initialState');
  const { loginUser } = initialState;

  return loginUser ? (
    <Access accessible={loginUser}>{children}</Access>
  ) : (
    <Redirect
      to={{ pathname: '/403', state: { redirect: location.pathname } }}
      replace
    />
  );
};
