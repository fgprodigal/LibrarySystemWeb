import React from 'react';
import { message } from 'antd';
import { request, Redirect, useModel } from 'umi';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import DocumentTitle from 'react-document-title';
import appConfig from '/config/app.config';
import styles from './login.less';

export default function LoginPage({ history, location }) {
  const { initialState, setInitialState } = useModel('@@initialState');
  const state = location.state ? location.state : {};
  const { redirect = '/' } = state;

  const login = async ({ username = '', password = '' }) => {
    const result = await request('/auth/login', {
      method: 'post',
      data: { username, password },
    });
    const { code, loginUser, permissions, err, token } = result;
    if (code == 0) {
      setInitialState({ loginUser, permissions });
      localStorage.setItem('token', token);
      message.success('登录成功');
    } else {
      if (err) {
        message.error(err);
      }
    }
  };

  return initialState.loginUser ? (
    <Redirect to={redirect} replace />
  ) : (
    <DocumentTitle title={`登录 - ${appConfig.title}`}>
      <div className={styles.main}>
        <div className={styles.form}>
          <ProForm
            onFinish={login}
            submitter={{
              searchConfig: {
                submitText: '登录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
          >
            <h1
              style={{
                textAlign: 'center',
              }}
            >
              <img
                style={{
                  height: '44px',
                  marginRight: 16,
                }}
                alt="logo"
                src={appConfig.logo}
              />
              {appConfig.title}
            </h1>
            <div
              style={{
                marginTop: 12,
                textAlign: 'center',
                marginBottom: 40,
              }}
            >
              用户登录
            </div>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              name="username"
              placeholder="请输入用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              name="password"
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            />
          </ProForm>
        </div>
      </div>
    </DocumentTitle>
  );
}
