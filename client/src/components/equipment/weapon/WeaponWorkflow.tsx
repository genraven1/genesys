import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Weapon} from "../../../models/equipment/Weapon";
import EquipmentService from "../../../services/EquipmentService";
import WeaponView from "./WeaponView";
import WeaponEdit from "./WeaponEdit";
import ViewAllWeapon from "./ViewAllWeapon";
import {EquipmentPath, RootPath} from "../../../services/Path";
import ViewAllInjuries from "../../injuries/ViewAllInjuries";
import InjuryPage from "../../injuries/InjuryPage";
import WeaponPage from "./WeaponPage";

function useFetchWeapon(name: string): Weapon {
    const [weapon, setWeapon] = useState<Weapon>()
    useEffect(() => {
        if (!name) {
            return
        }
        (async (): Promise<void> => {
            try {
                const weaponData = await EquipmentService.getWeapon(name)
                if (weaponData) {
                    setWeapon(weaponData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [name, setWeapon])
    return weapon as Weapon
}

export default function WeaponWorkflow() {
    // const {id} = useParams<{ id: string }>()
    // const weapon = useFetchWeapon(id as string)
    //
    // const useWorkflowRender = () => {
    //     const pathname = useLocation().pathname
    //     if (pathname.endsWith('/view')) {
    //         return weapon && <WeaponView weapon={weapon}/>
    //     } else if (pathname.endsWith('/edit')) {
    //         return weapon && <WeaponEdit wea={weapon}/>
    //     } else {
    //         return <ViewAllWeapon/>
    //     }
    // }
    //
    // return (
    //     <Fragment>
    //         {useWorkflowRender()}
    //     </Fragment>
    // )
    return (
        <Fragment>
            {useLocation().pathname.endsWith(EquipmentPath.Weapon) ? <ViewAllWeapon/> : <WeaponPage/>}
        </Fragment>
    )
}