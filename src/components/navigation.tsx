'use client';

import { useMemo } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Link from 'next/link';

import { usePathHandler } from '@/hooks';
import { palette, size } from '../constants';

const NavigationBar = () => {
  const { path } = usePathHandler();

  const menuList = useMemo(() => [{ href: path.main, label: '설문지 관리' }], [path]);

  return (
    <NavbarContainer>
      <LinkContainer>
        <Division>MAIN</Division>
        <NavList>
          {menuList.map(({ href, label }, idx) => (
            <LinkItem key={`nav-item-${idx}`} href={href} active={'true'}>
              {label}
            </LinkItem>
          ))}
        </NavList>
      </LinkContainer>
      <NavFooter>created by hyuncheol</NavFooter>
    </NavbarContainer>
  );
};

export default NavigationBar;

const Division = styled.div`
  font-size: 13px;
  margin-top: 20px;
  margin-left: 4px;
  font-weight: 700;
  margin-bottom: 4px;
  text-transform: uppercase;
  color: ${palette.gray900};
`;
const LinkItem = styled(Link)<{ active: string }>`
  display: block;
  padding: 12px 16px;
  border-radius: 8px;

  font-size: 14px;
  font-weight: 500;
  color: ${palette.gray900};
  text-decoration: none;
  white-space: nowrap;

  transition: 0.15s;

  ${({ active }) =>
    JSON.parse(active) &&
    css`
      color: ${palette.main};
      background-color: ${palette.mainBg} !important;
    `}

  &:hover {
    background-color: ${palette.gray100};
  }
`;
const LinkContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 4px 12px;
`;
const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const NavFooter = styled.div`
  margin-top: 12px;
  padding: 12px;
  font-size: 14px;
  text-align: left;
  color: ${palette.gray800};
`;

const NavbarContainer = styled.div`
  display: flex;
  min-width: ${size.navbar.width}px;
  flex-direction: column;
  position: relative;
  border-right: 1px solid #0000000f;
  overflow-y: auto;
  @media (max-width: 994px) {
    display: none;
  }
`;
