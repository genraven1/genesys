import {Organization} from "../../../models/lore/Organization";
import {Fragment} from "react";
import Typography from "@mui/material/Typography";

interface Props {
    organization: Organization
}

export default function OrganizationSidebar(props: Props) {
    const {organization} = props

    const renderFragment = (name: string, value: any) => {
        return (
            <Fragment>
                <Typography>{name}</Typography>
                <Typography>{value}</Typography>
            </Fragment>
        )
    }

    return (
        <Fragment>
            {organization.orgType && renderFragment('Organization Type', organization.orgType)}
            {organization.founded && renderFragment('Founding Date', organization.founded)}
            {organization.disbanded && renderFragment('Disbanded', organization.disbanded)}
            {organization.nickname && renderFragment('Alternative Name', organization.nickname)}
            <Typography>{'Members are referred to as ' + organization.membersName}</Typography>
        </Fragment>
    )
}