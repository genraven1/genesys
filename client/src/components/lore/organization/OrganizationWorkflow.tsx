import {useLocation} from "react-router-dom";
import {LorePath} from "../../../services/RootPath";
import {Fragment} from "react";
import ViewAllOrganizations from "./ViewAllOrganization";
import OrganizationPage from "./OrganizationPage";

export default function OrganizationWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(LorePath.Organization) ? <ViewAllOrganizations/> : <OrganizationPage/>}
        </Fragment>
    )
}