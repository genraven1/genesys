import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Weapon} from "../../../models/equipment/Weapon";
import EquipmentService from "../../../services/EquipmentService";
import WeaponView from "./WeaponView";
import WeaponEdit from "./WeaponEdit";
import ViewAllWeapon from "./ViewAllWeapon";
import {useFetchAllSettings} from "../../setting/SettingWorkflow";

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

export default function WeaponWorkflow(): JSX.Element {
    const {name} = useParams<{ name: string }>()
    const weapon = useFetchWeapon(name as string)
    const settings = useFetchAllSettings()

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return weapon && <WeaponView weapon={weapon} settings={settings}/>
        } else if (pathname.endsWith('/edit')) {
            return weapon && <WeaponEdit wea={weapon} settings={settings}/>
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