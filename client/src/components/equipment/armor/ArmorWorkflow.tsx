import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Armor} from "../../../models/equipment/Armor";
import EquipmentService from "../../../services/EquipmentService";
import ArmorView from "./ArmorView";
import ArmorEdit from "./ArmorEdit";
import ViewAllArmor from "./ViewAllArmor";
import {useFetchAllSettings} from "../../setting/SettingWorkflow";


function useFetchArmor(name: string): Armor {
    const [armor, setArmor] = useState<Armor>()
    useEffect(() => {
        if(!name) {return}
        (async (): Promise<void> => {
            try {
                const armorData = await EquipmentService.getArmor(name)
                if (armorData) {setArmor(armorData)}
            } catch (err) {console.log(err)}
        })()
    },[name, setArmor])
    return armor as Armor
}

export default function ArmorWorkflow(): JSX.Element {
    const { name } = useParams<{ name?: string }>()
    const armor = useFetchArmor(name!!)
    const settings = useFetchAllSettings()

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <ArmorView  armor={armor} settings={settings}/>
        }
        else if (pathname.endsWith('/edit')) {
            return <ArmorEdit ar={armor} settings={settings}/>
        }
        else {return <ViewAllArmor/>}
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}