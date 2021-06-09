import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';

export default function index(props) {
  const { children, location } = props;
  const state = location.state ? location.state : {};

  const { initialState, setInitialState } = useModel('@@initialState');
  const { loginUser } = initialState;

  // if (!localStorage.getItem('token') && !loginUser) {
  // setInitialState({});
  // }

  return <div className={styles.main}>{children}</div>;
}
