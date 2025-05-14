'use client';

import styled from '@emotion/styled';
type Colors = 'black' | 'blue' | 'red';

type MainBtnProps = {
  icon?: React.ReactNode;
  color?: Colors;
  onClick: () => void;
  css?: any;
  height?: number;
  width?: number;
  fontSize?: number;
  children: React.ReactNode;
};
type ColorGroup = { border: string; font: string; bg: string };

const group: { [key: string]: ColorGroup } = {
  black: {
    border: '#344767',
    font: '#344767',
    bg: '#ebebeb',
  },
  red: {
    border: '#f84747',
    font: '#f84747',
    bg: '#fff4f4',
  },
  blue: {
    border: '#2268ff',
    font: '#2268ff',
    bg: '#f1f2ff',
  },
};

const MainBtn = ({
  icon,
  color = 'black',
  onClick,
  children,
  height,
  width,
  fontSize,
}: MainBtnProps) => {
  const style = group[color];
  return (
    <CustomButton
      onClick={onClick}
      font={style.font}
      border={style.border}
      bg={style.bg}
      icon={String(!!icon)}
      height={height}
      width={width}
      fontSize={fontSize}
    >
      <BtnName>
        {icon}
        {children}
      </BtnName>
    </CustomButton>
  );
};
export default MainBtn;

const BtnName = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 400;
  justify-content: center;
  padding-top: 1px;
  width: 100%;

  svg {
    font-size: 16px;
    margin-top: -2px;
  }
`;

// /* padding: 1px 24px 0 ${({ icon }) => JSON.parse(icon) ? 20 : 24}px; */

const CustomButton = styled.button<
  ColorGroup & {
    icon: string;
    height?: number;
    width?: number;
    fontSize?: number;
  }
>`
  letter-spacing: 0.02857em;
  font-weight: 700;
  color: ${({ font }) => font};

  border: 1px solid ${({ border }) => border};
  border-radius: 8px;
  line-height: 1.4;
  text-align: center;
  transition: 150ms ease-in;
  min-height: 32px;
  min-width: 64px;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}` : 12)}px;
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  background-color: white;

  &:hover {
    opacity: 0.9;
    //transform: scale(1.01);
    background-color: ${({ bg }) => bg};
  }
`;
