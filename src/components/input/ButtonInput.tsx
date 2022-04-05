import { Button } from "@mui/material";

export interface InputButtonProps {
    value: number,
    name: string,
    onClick: () => void
}

export function InputButton(props: InputButtonProps): JSX.Element {
    const { value, name, onClick } = props;

    return (
        <Button value={value} name={name} onClick={(): void => onClick()} />
    )
}