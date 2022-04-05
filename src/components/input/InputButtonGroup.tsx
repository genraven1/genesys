import { Fragment, useState } from "react";
import { InputButton } from "./ButtonInput";

export interface InputButtonGroupProps {
    value: number,
}

export default function InputButtonGroup(props: InputButtonGroupProps): JSX.Element {
    const { value } = props;
    const [updatedValue, setupdatedValue] = useState(value);
    return (
        <Fragment>
            <InputButton value={value} name={'Up'} onClick={} />
            <InputButton value={value} name={'Down'} onClick={} />
        </Fragment>
    )
}