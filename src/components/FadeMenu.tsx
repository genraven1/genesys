import React, { forwardRef, useMemo } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import { Link, LinkProps } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';

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

export default function FadeMenu(props:any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        onClick={handleClose}
      >
        <ListMenuItemLink name='Create Talent' to='talents'></ListMenuItemLink>
        <ListMenuItemLink name='View All Talents' to='talents'></ListMenuItemLink>
      </Menu>
    </div>
  );
}
