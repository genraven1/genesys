import {ListItemButton, ListItemText} from "@mui/material"

interface Props {
    name: string,
    onClick: () => void
}

export default function ListMenuItemDialog(props: Props): JSX.Element {
    const { name, onClick } = props;

    return (
        <ListItemButton>
            <ListItemText primary={name} onClick={onClick} />
        </ListItemButton>
    )
}
