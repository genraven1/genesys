import {Organization} from "../../../models/lore/Organization";
import {Fragment} from "react";
import Typography from "@mui/material/Typography";


interface Props {
    organization: Organization
}

export default function OrganizationSidebar(props: Props): JSX.Element {
    const {organization} = props

    return (
        <Fragment>
            <Typography>{'Organization Type'}</Typography>
            <Typography>{organization?.orgType}</Typography>
            <Typography>{'Founding Date'}</Typography>
            <Typography>{organization?.founded}</Typography>
            <Typography>{'Alternative Name'}</Typography>
            <Typography>{organization?.nickname}</Typography>
            <Typography>{'Members are referred to as ' + organization?.membersName}</Typography>
        </Fragment>
    )
}