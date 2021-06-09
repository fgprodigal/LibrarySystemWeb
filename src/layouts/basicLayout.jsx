import React from 'react';
import ProLayout, {
  PageContainer,
  DefaultFooter,
  WaterMark,
} from '@ant-design/pro-layout';
import { useModel, useSelector, Link } from 'umi';
import RightContent from './rightContent';
import routesConfig from '/config/routes.config';
import appConfig from '/config/app.config';
import getMenuDataFromRoutes from '@/utils/getMenuFromRoute';
import { ControlOutlined, BookOutlined } from '@ant-design/icons';

const IconMap = {
  control: <ControlOutlined />,
  book: <BookOutlined />,
};

const loopMenuItem = (menus) =>
  menus.map(({ icon, children, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon],
    children: children && loopMenuItem(children),
  }));

export default function basicLayout(props) {
  const { children } = props;
  const { initialState } = useModel('@@initialState');
  const { loginUser } = initialState;
  const loading = useSelector((state) => state.loading);
  const year = new Date().getFullYear();

  const menus = loopMenuItem(getMenuDataFromRoutes(routesConfig.route.routes));

  return (
    <div>
      <ProLayout
        title={appConfig.title}
        logo={appConfig.logo}
        defaultCollapsed={false}
        style={{ minHeight: '100vh' }}
        menuDataRender={() => menus}
        siderWidth={250}
        disableContentMargin
        rightContentRender={() => <RightContent />}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path || ''}>{defaultDom}</Link>;
        }}
        footerRender={() => (
          <DefaultFooter
            copyright={`${
              year > 2021 ? '2021-' : ''
            }${year} 自治区人民医院信息中心 王坤`}
            links={false}
          />
        )}
        {...props}
        {...initialState?.settings}
      >
        <PageContainer>
          <WaterMark content={loginUser} fontColor="rgba(0,0,0,.1)">
            {children}
          </WaterMark>
        </PageContainer>
      </ProLayout>
    </div>
  );
}
