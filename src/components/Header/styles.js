import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
      width: 55px;
    }

    a {
      font-weight: bold;
      color: #5163c8;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Asset = styled.div`
  display: flex;

  div {
    text-align: right;

    strong {
      display: block;
      color: #333;
      font-size: 14px;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }
`;
