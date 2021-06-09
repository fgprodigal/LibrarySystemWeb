import React from 'react';
import { Button } from 'antd';
import { Link } from 'umi';
import Exception from '@/components/Exception';
import DocumentTitle from 'react-document-title';
import appConfig from '/config/app.config';
import styles from './exception.less';

const actions = (
  <Link to="/" replace>
    <Button type="primary">返回首页</Button>
  </Link>
);

export default function Page404() {
  return (
    <DocumentTitle title={`页面不存在 - ${appConfig.title}`}>
      <Exception type="404" actions={actions} className={styles.main} />
    </DocumentTitle>
  );
}
