import {Organization} from "../../../models/lore/Organization";
import {LorePath} from "../../../services/RootPath";
import {Card, CardContent, Grid} from "@mui/material";
import * as React from "react";
import OrganizationSidebar from "./OrganizationSidebar";
import OrganizationService from "../../../services/lore/OrganizationService";
import CenteredCardHeaderWithAction from "../../common/card/header/CenteredCardHeaderWithAction";
import {useLocation, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";

export default function OrganizationPage() {
    const {id} = useParams<{ id: string }>();
    const [organization, setOrganization] = useState<Organization | null>(null);
    let pathname = useLocation().pathname;

    useEffect(() => {
        if (!id) {
            return;
        }
        (async (): Promise<void> => {
            setOrganization(await OrganizationService.getOrganization(id));
        })()
    }, [id, setOrganization]);

    if (!organization) {
        return <Fragment/>;
    }

    const updateOrganization = async (updatedOrganization: Organization) => {
        if (organization) {
            setOrganization(await OrganizationService.updateOrganization(updatedOrganization));
        }
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={organization.name} path={LorePath.Organization + organization.id}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <Grid item xs={8}>

                        </Grid>
                        <Grid item xs={4}>
                            <OrganizationSidebar organization={organization}
                                                 updateOrganization={updateOrganization}
                                                 disabled={pathname.endsWith('/view')}/>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}