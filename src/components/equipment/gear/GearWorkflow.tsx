import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Gear} from "../../../models/equipment/Gear";
import EquipmentService from "../../../services/EquipmentService";
import GearView from "./GearView";
import GearEdit from "./GearEdit";
import ViewAllGear from "./ViewAllGear";
import {useFetchAllSettings} from "../../setting/SettingWorkflow";


function useFetchGear(id: number): Gear {
    const [gear, setGear] = useState<Gear>()
    useEffect(() => {
        if(!id) {return}
        (async (): Promise<void> => {
            try {
                const gearData = await EquipmentService.getGear(id)
                if (gearData) {setGear(gearData)}
            } catch (err) {console.log(err)}
        })()
    },[id, setGear])
    return gear as Gear
}

export default function GearWorkflow(): JSX.Element {
    const {id} = useParams<{ id?: string }>()
    const Gear = useFetchGear(Number(id!!))
    const settings = useFetchAllSettings()

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <GearView  gear={Gear} allSettings={settings}/>
        }
        else if (pathname.endsWith('/edit')) {
            return <GearEdit gea={Gear} allSettings={settings}/>
        }
        else {return <ViewAllGear/>}
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}