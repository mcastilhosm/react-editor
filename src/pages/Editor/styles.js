import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Body = styled.div`
  padding: 20px;
`;

export const ToolList = styled.ul`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
`;

export const Tool = styled.li`
  list-style: none;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid #ccc;
  width: -webkit-fill-available;
  cursor: pointer;

  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: bold;
  background: #5163c8;
  border-radius: 5px;
  transition: background 0.2s ease 0s, color 0.2s ease 0s;

  &:not(:first-child) {
    margin-left: 10px;
  }

  &:hover {
    background: #ddd;
  }
`;

export const ContentDrawer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Drawer = styled.canvas`
  border: 1px solid #ccc;
`;
