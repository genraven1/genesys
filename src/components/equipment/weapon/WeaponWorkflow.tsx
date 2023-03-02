import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Weapon} from "../../../models/equipment/Weapon";
import EquipmentService from "../../../services/EquipmentService";
import WeaponView from "./WeaponView";
import WeaponEdit from "./WeaponEdit";
import ViewAllWeapon from "./ViewAllWeapon";
import {useFetchAllSettings} from "../../setting/SettingWorkflow";

function useFetchWeapon(id: number): Weapon {
    const [weapon, setWeapon] = useState<Weapon>()
    useEffect(() => {
        if(!id) {return}
        (async (): Promise<void> => {
            try {
                const weaponData = await EquipmentService.getWeapon(id)
                if (weaponData) {setWeapon(weaponData)}
            } catch (err) {console.log(err)}
        })()
    },[id, setWeapon])
    return weapon as Weapon
}

export default function WeaponWorkflow(): JSX.Element {
    const { id } = useParams<{ id?: string }>()
    const weapon = useFetchWeapon(Number(id!!))
    const settings = useFetchAllSettings()

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <WeaponView  weapon={weapon} allSettings={settings}/>
        }
        else if (pathname.endsWith('/edit')) {
            return <WeaponEdit wea={weapon} allSettings={settings}/>
        }
        else {return <ViewAllWeapon/>}
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}