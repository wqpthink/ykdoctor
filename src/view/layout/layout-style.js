import styled from 'styled-components';

/**
 * 附头部、侧边导航内容部分包裹样式
 */
export const HeaderAndSideContentWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 50px;//因为header的高度为50px
  left: 0px;
  bottom: 0px;
`;

/**
 * 附头部、侧边导航内容左部包裹样式
 */
export const HeaderAndSideContentChildLeftWrapper = styled.div`
  width:15%;
  height:100%;
  float:left;
  background: #fff;
`;

/**
 * 附头部、侧边导航内容右部包裹样式
 */
export const HeaderAndSideContentChildRightWrapper = styled.div`
  width:85%;
  height: 100%;
  float: right;
  background: #fff;
`;
