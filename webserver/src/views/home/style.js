import styled from 'styled-components';
import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;

export const HomeWrap = styled.div`
  display: flex;
  height: 100%;
`;

export const SiderWrap = styled(Sider)`
  // background: red;
`;

export const HeaderWrap = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ccc !important;

  .trigger {
    font-size: 24px;
  }
`;

export const ContentWrap = styled(Content)``;

export const Logo = styled.div`
  height: 64px;
  background: green;
`;
