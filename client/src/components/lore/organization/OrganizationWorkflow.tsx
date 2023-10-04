import {useLocation, useParams} from "react-router-dom";
import {LorePath} from "../../../services/Path";
import {Organization} from "../../../models/lore/Organization";
import {Fragment, useEffect, useState} from "react";
import LoreService from "../../../services/LoreService";
import OrganizationView from "./OrganizationView";
import OrganizationEdit from "./OrganizationEdit";

function useFetchOrganization(name: string, path: LorePath): Organization {
    const [organization, setOrganization] = useState<Organization>()
    useEffect(() => {
        if(!name) {return}
        (async (): Promise<void> => {
            try {
                const orgData = await LoreService.getLore(name, path)
                if (orgData) {setOrganization(orgData)}
            } catch (err) {console.log(err)}
        })()
    },[name, organization, path])
    return organization as Organization
}

export default function OrganizationWorkflow(): JSX.Element {
    const { name } = useParams<{ name?: string }>()
    const path = LorePath.Organization
    const organization = useFetchOrganization(name!!, path)

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <OrganizationView  organization={organization}/>
        }
        else if (pathname.endsWith('/edit')) {
            return <OrganizationEdit org={organization}/>
        }
        else {return <Fragment/>}
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}