import {ViewFieldCard} from "../ViewFieldCard";
import {NumberTextFieldCard} from "./NumberTextField";
import * as React from "react";
import {Armor} from "../../../models/equipment/Armor";
import {useLocation} from "react-router-dom";
import {Fragment} from "react";

interface Props {
    armor: Armor
    updateSoak: (soak: number) => void
}

export default function SoakCard(props: Props) {
    const {armor, updateSoak} = props;
    let pathname = useLocation().pathname;

    const renderSoakCard = () => {
        return pathname.endsWith('/view') ? <ViewFieldCard name={"Soak"} value={'+' + armor.soak}/> :
            <NumberTextFieldCard title={"Soak"} value={armor.soak}
                                 disabled={pathname.endsWith('/view')} onChange={updateSoak} min={0} max={5}/>;
    };

    return (
        <Fragment>
            {renderSoakCard()}
        </Fragment>
    );
}