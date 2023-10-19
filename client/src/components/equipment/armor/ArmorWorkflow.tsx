import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Armor} from "../../../models/equipment/Armor";
import EquipmentService from "../../../services/EquipmentService";
import ArmorView from "./ArmorView";
import ArmorEdit from "./ArmorEdit";
import ViewAllArmor from "./ViewAllArmor";
import {useFetchAllSettings} from "../../setting/SettingWorkflow";


function useFetchArmor(id: number): Armor {
    const [armor, setArmor] = useState<Armor>()
    useEffect(() => {
        if(!id) {return}
        (async (): Promise<void> => {
            try {
                const armorData = await EquipmentService.getArmor(id)
                if (armorData) {setArmor(armorData)}
            } catch (err) {console.log(err)}
        })()
    },[id, setArmor])
    return armor as Armor
}

export default function ArmorWorkflow(): JSX.Element {
    const { id } = useParams<{ id?: string }>()
    const armor = useFetchArmor(Number(id!!))
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