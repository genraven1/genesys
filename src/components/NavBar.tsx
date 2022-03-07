import React, { forwardRef, useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, LinkProps } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import SideNav from './SideNav';

interface TopMenuItemProps {
  to: string,
  name: string,
}

function ListMenuItemLink(props: TopMenuItemProps): JSX.Element {
  const { to, name } = props;

  const renderLink = useMemo(() => forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref): React.ReactElement => (
    <Link to={to} ref={ref} {...itemProps} />
  )),
    [to]);

  return (
    <List>
      <ListItem button component={renderLink}>
        <ListItemText primary={name} />
      </ListItem>
    </List>
  );
}

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <ListMenuItemLink name='Home' to='' />
            <SideNav />
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}