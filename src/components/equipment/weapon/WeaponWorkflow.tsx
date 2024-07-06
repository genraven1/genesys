import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Weapon} from "../../../models/equipment/Weapon";
import EquipmentService from "../../../services/EquipmentService";
import WeaponView from "./WeaponView";
import WeaponEdit from "./WeaponEdit";
import ViewAllWeapon from "./ViewAllWeapon";

function useFetchWeapon(id: string): Weapon {
    const [weapon, setWeapon] = useState<Weapon>()
    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setWeapon(await EquipmentService.getWeapon(id))
        })()
    }, [id, setWeapon])
    return weapon as Weapon
}

export default function WeaponWorkflow() {
    const {weapon_id} = useParams<{ weapon_id: string }>()
    const weapon = useFetchWeapon(weapon_id!)

    const useWorkflowRender = () => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return weapon && <WeaponView weapon={weapon}/>
        } else if (pathname.endsWith('/edit')) {
            return weapon && <WeaponEdit wea={weapon}/>
        } else {
            return <ViewAllWeapon/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}