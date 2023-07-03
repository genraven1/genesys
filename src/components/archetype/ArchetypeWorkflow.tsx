import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {useFetchAllSettings} from "../setting/SettingWorkflow";
import ViewAllArchetypes from "./ViewAllArchetypes";
import ArchetypeService from "../../services/ArchetypeService";
import Archetype from "../../models/actor/player/Archetype";
import ArchetypeView from "./ViewArchetype";
import ArchetypeEdit from "./ArchetypeEdit";


function useFetchArchetype(name: string): Archetype {
    const [archetype, setArchetype] = useState<Archetype>()
    useEffect(() => {
        if (!name) {
            return
        }
        (async (): Promise<void> => {
            try {
                const archetypeData = await ArchetypeService.getArchetype(name)
                if (archetypeData) {
                    setArchetype(archetypeData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [name, setArchetype])
    return archetype as Archetype
}

export default function ArchetypeWorkflow(): JSX.Element {
    const {name} = useParams<{ name?: string }>()
    const archetype = useFetchArchetype(name!!)
    const settings = useFetchAllSettings()

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <ArchetypeView archetype={archetype} settings={settings}/>
        } else if (pathname.endsWith('/edit')) {
            return <ArchetypeEdit arch={archetype} settings={settings}/>
        } else {
            return <ViewAllArchetypes/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}