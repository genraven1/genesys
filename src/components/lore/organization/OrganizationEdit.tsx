import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {LorePath} from "../../../services/Path";
import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import * as React from "react";
import {Organization, DefaultOrganization, OrgKey, OrgType} from "../../../models/lore/Organization";
import LoreService from "../../../services/LoreService";
import InputSelectField from "../../common/InputSelectField";
import EditNumberCard from "../../common/EditNumberCard";

const ORG_TYPE_OPTIONS = orgTypeOptions()

function orgTypeOptions() {
    const array = [];

    for (const [key, value] of Object.entries(OrgType)) {
        if (!Number.isNaN(Number(key))) {
            continue;
        }
        array.push({ value: key, label: value });
    }
    return array;
}

export default function OrganizationEdit() {
    const { name } = useParams<{ name: string }>()
    const path = LorePath.Organization
    const [organization, setOrganization] = useState<Organization | null>(null)
    const [errors, setErrors] = useState({} as any)
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

    const onNumberChange = async (key: keyof Organization, value: number) => {
        const copyOrg = {...organization} as Organization
        switch (key) {
            case "founded":
                copyOrg.founded = value
                break
            case "type":
            case "orgType":
            case "name":
                break
        }

        await updateOrganization(copyOrg)
    }

    const onChange = async (key: keyof Organization, value: string) => {
        if (value === null || (organization !== null && organization[key] === value)) {
            return;
        }
        const copyOrg = {...organization} as Organization
        switch (key) {
            case "orgType":
                copyOrg.orgType = value as OrgType
                break
            case "type":
            case 'name':
                break;
        }

        await updateOrganization(copyOrg)
    }

    const updateOrganization = async (copyOrg: Organization): Promise<Organization> => {
        setOrganization(copyOrg)
        await LoreService.updateOrganization(copyOrg.name, copyOrg)
        return organization!!
    }

    const onView = () => {
        navigate(path + name + '/view');
    }

    return (
        <Card>
            <CardHeader title={getName(organization)} style={{ textAlign: 'center' }} action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                <CheckIcon color='primary' fontSize='small' />
            </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <Grid item xs>
                            <Card>
                                <CardHeader title={'Type of Organization'} style={{ textAlign: 'center' }} />
                                <Divider />
                                <InputSelectField defaultValue={getOrganization(organization).orgType} options={ORG_TYPE_OPTIONS} onCommit={(value: string): void => { onChange(OrgKey.orgType, value) }} />
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container spacing={10}>
                        <Grid item xs>
                            <EditNumberCard title={'Founding Year'} value={getOrganization(organization).founded} onChange={(value: number): void => { onNumberChange(OrgKey.founded, value)}} />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
