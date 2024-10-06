import {useLocation} from "react-router-dom";
import {Fragment} from "react";
import ViewAllArchetypes from "./ViewAllArchetypes";
import {RootPath} from "../../services/Path";
import ArchetypePage from "./ArchetypePage";

export default function ArchetypeWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(RootPath.Archetype) ? <ViewAllArchetypes/> : <ArchetypePage/>}
        </Fragment>
    )
}