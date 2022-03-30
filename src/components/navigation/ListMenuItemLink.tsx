import { List, ListItem, ListItemText } from "@mui/material";
import { useMemo, forwardRef } from "react";
import { LinkProps, Link } from "react-router-dom";

export interface MenuListItemProps {
    to: string,
    name: string,
}

export default function ListMenuItemLink(props: MenuListItemProps): JSX.Element {
    const { to, name } = props;

    const renderLink = useMemo(() => forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref): React.ReactElement => (
        <Link to={to} ref={ref} {...itemProps} />
    )),[to]);

    return (
        <List>
            <ListItem button component={renderLink}>
                <ListItemText primary={name} />
            </ListItem>
        </List>
    );
}