import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Armor} from "../../../models/equipment/Armor";
import EquipmentService from "../../../services/EquipmentService";
import ArmorView from "./ArmorView";
import ArmorEdit from "./ArmorEdit";
import ViewAllArmor from "./ViewAllArmor";


function useFetchArmor(name: string): Armor {
    const [armor, setArmor] = useState<Armor>()
    useEffect(() => {
        if (!name) {
            return
        }
        (async (): Promise<void> => {
            try {
                const armorData = await EquipmentService.getArmor(name)
                if (armorData) {
                    setArmor(armorData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [name, setArmor])
    return armor as Armor
}

export default function ArmorWorkflow() {
    const {name} = useParams<{ name: string }>()
    const armor = useFetchArmor(name as string)

    const useWorkflowRender = () => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return armor && <ArmorView armor={armor}/>
        } else if (pathname.endsWith('/edit')) {
            return armor && <ArmorEdit ar={armor}/>
        } else {
            return <ViewAllArmor/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}