import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {LorePath} from "../../../services/Path";
import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import * as React from "react";
import {Organization, OrgKey, OrgType} from "../../../models/lore/Organization";
import LoreService from "../../../services/LoreService";
import InputSelectField, {Option} from "../../common/InputSelectField";
import EditNumberCard from "../../common/EditNumberCard";
import {InputTextFieldCard} from "../../common/InputTextFieldCard";

const getOrgTypes = (): Option[] => {
    return Object.values(OrgType).map((value) => ({value}))
}

interface Props {
    org: Organization
}

export default function OrganizationEdit(props: Props) {
    const {org} = props
    const {id} = useParams<{ id: string }>()
    const path = LorePath.Organization
    const [organization, setOrganization] = useState<Organization>(org)

    let navigate = useNavigate()

    useEffect(() => {setOrganization(org)}, [org])

    const onNumberChange = async (key: keyof Organization, value: number) => {
        const copyOrg = {...organization} as Organization
        switch (key) {
            case "founded":
                copyOrg.founded = value
                break
            case "disbanded":
                copyOrg.disbanded = value
                break
            case "type":
            case "orgType":
            case "name":
            case "membersName":
            case "nickname":
                break
        }

        await updateOrganization(copyOrg)
    }

    const onChange = async (key: keyof Organization, value: string) => {
        if (value === null || (organization !== null && organization!![key] === value)) {
            return;
        }
        const copyOrg = {...organization} as Organization
        switch (key) {
            case "orgType":
                copyOrg.orgType = value as OrgType
                break
            case "membersName":
                copyOrg.membersName = value
                break
            case "nickname":
                copyOrg.nickname = value
                break
            case "disbanded":
            case "founded":
            case "type":
            case 'name':
                break
        }

        await updateOrganization(copyOrg)
    }

    const updateOrganization = async (copyOrg: Organization): Promise<Organization> => {
        setOrganization(copyOrg)
        await LoreService.updateOrganization(id as string, copyOrg)
        return organization!!
    }

    const onView = () => {
        navigate(path + id + '/view')
    }

    return (
        <Card>
            <CardHeader title={organization?.name!!} style={{ textAlign: 'center' }} action={<IconButton title='View' size='small' onClick={(): void => onView()}>
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
                                <InputSelectField defaultValue={organization?.orgType!!} options={getOrgTypes()} onCommit={(value: string): void => { onChange(OrgKey.orgType, value) }} />
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container spacing={10}>
                        <Grid item xs>
                            <EditNumberCard title={'Founding Year'} value={organization?.founded} onChange={(value: number): void => { onNumberChange(OrgKey.founded, value)}} />
                        </Grid>
                        <Grid item xs>
                            <EditNumberCard title={'Year Disbanded'} value={organization?.disbanded!!} onChange={(value: number): void => { onNumberChange(OrgKey.disbanded, value)}} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={10}>
                        <Grid item xs>
                            <InputTextFieldCard defaultValue={organization?.nickname} onCommit={(value: string): void => { onChange(OrgKey.nickname, value) }} title={'Alternative Name'}  helperText={'Other Names the Organization goes by'} placeholder={'Pirates Republic'}/>
                        </Grid>
                        <Grid item xs>
                            <InputTextFieldCard defaultValue={organization?.membersName} onCommit={(value: string): void => { onChange(OrgKey.membersName, value) }} title={'Name of Members'} helperText={'How members are referred to'} placeholder={'Pirates'} />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
