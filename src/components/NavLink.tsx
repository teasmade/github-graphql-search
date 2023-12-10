import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Link, Box } from '@mui/material';

type NavLinkProps = {
  to: string;
  label: React.ReactNode;
  isHeader?: boolean;
};

const NavLink: React.FC<NavLinkProps> = ({ to, label, isHeader = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const underline = isHeader ? 'none' : isActive ? 'always' : 'hover';

  return (
    <Link
      component={RouterLink}
      to={to}
      color="inherit"
      underline={underline}
      sx={{ marginRight: 3 }}
    >
      {!isHeader ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          {label}
        </Box>
      ) : (
        label
      )}
    </Link>
  );
};

export default NavLink;
