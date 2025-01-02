import {Organization, OrgType} from "../../../models/lore/Organization";
import {Fragment} from "react";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import OrganizationTypeCard from "./OrganizationTypeCard";

interface Props {
    organization: Organization
    updateOrganization: (organization: Organization) => void
    disabled: boolean
}

export default function OrganizationSidebar(props: Props) {
    const {organization, updateOrganization, disabled} = props;

    const renderFragment = (name: string, value: any) => {
        return (
            <Fragment>
                <Typography>{name}</Typography>
                <Typography>{value}</Typography>
            </Fragment>
        )
    }

    const handleOrganizationTypeUpdate = (value: OrgType) => {
        updateOrganization({...organization, orgType: value});
    }

    return (
        <Grid container justifyContent={'center'}>
            <OrganizationTypeCard value={organization.orgType} onChange={handleOrganizationTypeUpdate} disabled={disabled}/>
            {/*{organization.orgType && renderFragment('Organization Type', organization.orgType)}*/}
            {organization.founded && renderFragment('Founding Date', organization.founded)}
            {organization.disbanded && renderFragment('Disbanded', organization.disbanded)}
            {organization.nickname && renderFragment('Alternative Name', organization.nickname)}
            <Typography>{'Members are referred to as ' + organization.membersName}</Typography>
        </Grid>
    )
}