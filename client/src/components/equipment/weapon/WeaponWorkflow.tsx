import {Fragment} from "react";
import {useLocation} from "react-router-dom";
import ViewAllWeapon from "./ViewAllWeapon";
import {EquipmentPath} from "../../../services/RootPath";
import WeaponPage from "./WeaponPage";

export default function WeaponWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(EquipmentPath.Weapon) ? <ViewAllWeapon/> : <WeaponPage/>}
        </Fragment>
    )
}