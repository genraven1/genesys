import {useLocation, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import ArchetypeService from "../../services/ArchetypeService";
import Archetype from "../../models/actor/player/Archetype";
import ViewAllArchetypes from "./ViewAllArchetypes";
import ArchetypeView from "./ArchetypeView";
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

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return archetype && <ArchetypeView archetype={archetype}/>
        } else if (pathname.endsWith('/edit')) {
            return archetype && <ArchetypeEdit arch={archetype}/>
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