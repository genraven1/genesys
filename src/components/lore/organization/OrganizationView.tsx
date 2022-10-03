import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Organization, DefaultOrganization} from "../../../models/lore/Organization";
import {LorePath} from "../../../services/Path";
import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import LoreService from "../../../services/LoreService";
import {ViewFieldCard, ViewNumberFieldCard} from "../../common/ViewFieldCard";

export default function OrganizationView() {
    const { name } = useParams<{ name: string }>()
    const path = LorePath.Organization
    const [organization, setOrganization] = useState<Organization | null>(null)
    let navigate = useNavigate()

    useEffect(() => {
        if (!name) {
            return;
        }
        (async (): Promise<void> => {
            const orgData = await LoreService.getLore(name, path)
            if (!orgData) {return}
            setOrganization(orgData)
        })();
    }, [name, path])

    function getName(org: Organization | null): string {
        if (!org) {
            return 'Organization View'
        }
        return org.name
    }

    function getOrganization(org: Organization | null): Organization {
        if (!org) {
            return DefaultOrganization.create()
        }
        return org
    }

    const onEdit = () => {
        navigate(path + name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={getName(organization)}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Type of Organization'} value={getOrganization(organization).orgType} />
                    </Grid>
                    <Grid container spacing={10}>
                        <ViewNumberFieldCard name={'Founding Date'} value={getOrganization(organization).founded} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}