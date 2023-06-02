import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function NavLinkk({ children, to, active = false }) {
  return <NavLink to={to}></NavLink>;
}

export default NavLinkk;
