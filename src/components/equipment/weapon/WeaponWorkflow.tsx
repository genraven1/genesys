import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Weapon} from "../../../models/equipment/Weapon";
import EquipmentService from "../../../services/EquipmentService";
import WeaponView from "./WeaponView";
import WeaponEdit from "./WeaponEdit";
import ViewAllWeapon from "./ViewAllWeapon";

function useFetchWeapon(name: string): Weapon {
    const [weapon, setWeapon] = useState<Weapon>()
    useEffect(() => {
        if(!name) {return}
        (async (): Promise<void> => {
            try {
                const weaponData = await EquipmentService.getWeapon(name)
                if (weaponData) {setWeapon(weaponData)}
            } catch (err) {console.log(err)}
        })()
    },[name, setWeapon])
    return weapon as Weapon
}

export default function WeaponWorkflow(): JSX.Element {
    const {name} = useParams<{ name?: string }>()
    const weapon = useFetchWeapon(name!!)

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <WeaponView  weapon={weapon}/>
        }
        else if (pathname.endsWith('/edit')) {
            return <WeaponEdit wea={weapon}/>
        }
        else {return <ViewAllWeapon/>}
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}