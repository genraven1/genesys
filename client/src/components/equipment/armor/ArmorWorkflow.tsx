import {Fragment} from "react";
import {useLocation} from "react-router-dom";
import ViewAllArmor from "./ViewAllArmor";
import {EquipmentPath} from "../../../services/RootPath";
import ArmorPage from "./ArmorPage";

export default function ArmorWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(EquipmentPath.Armor) ? <ViewAllArmor/> : <ArmorPage/>}
        </Fragment>
    )
}