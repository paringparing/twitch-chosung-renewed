import styled, { css } from "styled-components"
import { Colors } from "../constants"

export const Button = styled.button<{ color?: string; fullWidth?: boolean }>`
  background: ${({ color = Colors.blue }) => color};
  color: #fff;
  padding: 15px 30px;
  border: none;
  font-size: 24px;
  border-radius: 20px;
  cursor: pointer;
  transition: all ease 0.2s;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;

  &:disabled {
    cursor: unset;
    background: #d4d4d4 !important;
    color: #717171 !important;
  }

  &:not(:disabled):hover {
    filter: brightness(0.9);
    color: #fff;
  }

  &:not(:disabled):active {
    filter: brightness(0.8);
    color: #fff;
  }

  ${({ fullWidth }) =>
    fullWidth
      ? css`
          width: 100%;
        `
      : ""}
`
