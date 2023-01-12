import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Gear} from "../../../models/equipment/Equipment";
import EquipmentService from "../../../services/EquipmentService";
import GearView from "./GearView";
import GearEdit from "./GearEdit";


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
    const Gear = useFetchGear(name!!)

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <GearView  gear={Gear}/>
        }
        else if (pathname.endsWith('/edit')) {
            return <GearEdit gea={Gear}/>
        }
        else {return <Fragment/>}
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}