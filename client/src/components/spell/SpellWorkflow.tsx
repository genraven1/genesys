import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import SpellService from "../../services/SpellService";
import Spell from "../../models/spell/Spell";
import SpellEdit from "./SpellEdit";

function useFetchSpell(name: string): Spell {
    const [spell, setSpell] = useState<Spell>()

    useEffect(() => {
        if (!name) {
            return
        }
        (async (): Promise<void> => {
            try {
                const spellData = await SpellService.getSpell(name)
                if (spellData) {
                    setSpell(spellData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [name, setSpell])
    return spell as Spell
}

export default function SpellWorkflow(): JSX.Element {
    const {name} = useParams<{ name?: string }>()
    const spell = useFetchSpell(name!!)

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/edit')) {
            return spell && <SpellEdit sp={spell}/>
        }
        return <Fragment/>
        // if (pathname.endsWith('/view')) {
        //     return talent && <TalentView talent={talent!} allSettings={settings}/>
        // } else if (pathname.endsWith('/edit')) {
        //     return talent && <TalentEdit tal={talent!} settings={settings}/>
        // } else {
        //     return <ViewAllTalents/>
        // }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}