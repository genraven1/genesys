import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Gear} from "../../../models/equipment/Gear";
import EquipmentService from "../../../services/EquipmentService";
import GearView from "./GearView";
import GearEdit from "./GearEdit";
import ViewAllGear from "./ViewAllGear";
import {useFetchAllSettings} from "../../setting/SettingWorkflow";


function useFetchGear(name: string): Gear {
    const [gear, setGear] = useState<Gear>()
    useEffect(() => {
        if(!name) {return}
        (async (): Promise<void> => {
            try {
                const gearData = await EquipmentService.getGear(name)
                if (gearData) {setGear(gearData)}
            } catch (err) {console.log(err)}
        })()
    },[name, setGear])
    return gear as Gear
}

export default function GearWorkflow(): JSX.Element {
    const {name} = useParams<{ name?: string }>()
    const gear = useFetchGear(name as string)
    const settings = useFetchAllSettings()

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return gear && <GearView  gear={gear} settings={settings}/>
        }
        else if (pathname.endsWith('/edit')) {
            return gear && <GearEdit gea={gear} settings={settings}/>
        }
        else {return <ViewAllGear/>}
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}