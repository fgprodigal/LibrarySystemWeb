import React from 'react';
import { Avatar, Space, Dropdown, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import styles from './rightContent.less';

export default function rightContent() {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { loginUser } = initialState;

  const logout = () => {
    localStorage.removeItem('token');
    setInitialState({});
  };

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={logout}>
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return loginUser ? (
    <Space>
      <Dropdown
        className={styles.menu}
        overlayClassName={styles.dropdown}
        overlay={menu}
      >
        <span>
          <Avatar className={styles.avatar}>{loginUser[0]}</Avatar>
          <span>{loginUser}</span>
        </span>
      </Dropdown>
    </Space>
  ) : (
    <></>
  );
}
