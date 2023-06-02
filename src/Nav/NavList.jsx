import React from 'react';
import { Router } from 'react-router-dom';
import styled from 'styled-components';

function NavList({ children, expanded = true }) {
  return <Router>{children}</Router>;
}

export default NavList;
