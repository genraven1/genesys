import {Armor} from "../../../models/equipment/Armor";
import {useLocation} from "react-router-dom";
import { NumberTextFieldCard } from "./NumberTextField";
import { ViewFieldCard } from "../ViewFieldCard";
import {Fragment} from "react";

interface Props {
    armor: Armor
    updateDefense: (defense: number) => void
}

export default function DefenseCard(props: Props) {
    const {armor, updateDefense} = props;
    let pathname = useLocation().pathname;

    const renderDefenseCard = () => {
        return pathname.endsWith('/view') ? <ViewFieldCard name={"Defense"} value={String(armor.defense)}/> :
            <NumberTextFieldCard title={"Defense"} value={armor.defense}
                                 disabled={pathname.endsWith('/view')} onChange={updateDefense} min={0} max={4}/>;
    };

    return (
        <Fragment>
            {renderDefenseCard()}
        </Fragment>
    )
}