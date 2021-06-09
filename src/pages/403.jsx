import React from 'react';
import { Button } from 'antd';
import { Link } from 'umi';
import Exception from '@/components/Exception';
import DocumentTitle from 'react-document-title';
import appConfig from '/config/app.config';
import styles from './exception.less';

export default function Page403({ location }) {
  const state = location.state ? location.state : {};

  const actions = (
    <Link to={{ pathname: '/login', state }}>
      <Button type="primary">用户登录</Button>
    </Link>
  );

  return (
    <DocumentTitle title={`未授权的访问 - ${appConfig.title}`}>
      <Exception type="403" actions={actions} className={styles.main} />
    </DocumentTitle>
  );
}
