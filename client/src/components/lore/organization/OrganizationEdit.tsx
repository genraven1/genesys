import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {LorePath} from "../../../services/RootPath";
import {Card, CardContent, CardHeader, Grid, IconButton} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import * as React from "react";
import {Organization, OrgKey, OrgType} from "../../../models/lore/Organization";
import {Option} from "../../common/InputSelectField";
import EditNumberCard from "../../common/EditNumberCard";
import {InputTextFieldCard} from "../../common/InputTextFieldCard";
import {LoreType} from "../../../models/lore/Lore";
import InputSelectFieldCard from "../../common/InlineSelectFieldCard";
import OrganizationService from "../../../services/lore/OrganizationService";

interface Props {
    org: Organization
}

export default function OrganizationEdit(props: Props) {
    const {org} = props
    const path = LorePath.Organization
    const [organization, setOrganization] = useState<Organization>(org)

    let navigate = useNavigate()

    useEffect(() => {
        setOrganization(org)
    }, [org])

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
                copyOrg.disbanded = Number(value)
                break
            case "founded":
                copyOrg.founded = Number(value)
                break
            case "type":
                copyOrg.type = value as LoreType
                break
            case 'name':
                break
        }

        await updateOrganization(copyOrg)
    }

    const updateOrganization = async (copyOrg: Organization) => {
        setOrganization(await OrganizationService.updateOrganization(copyOrg))
    }

    const onView = () => {
        navigate(path + organization.name + '/view')
    }

    return (
        <Card>
            <CardHeader title={organization?.name!!} style={{textAlign: 'center'}}
                        action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                            <CheckIcon color='primary' fontSize='small'/>
                        </IconButton>}>
            </CardHeader>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <EditNumberCard title={'Founding Year'} value={organization.founded}
                                        onChange={(value: number): void => {
                                            onChange(OrgKey.founded, String(value))
                                        }}/>
                        <EditNumberCard title={'Year Disbanded'} value={organization.disbanded!!}
                                        onChange={(value: number): void => {
                                            onChange(OrgKey.disbanded, String(value))
                                        }}/>
                    </Grid>
                    <Grid container spacing={10}>
                        <InputTextFieldCard defaultValue={organization.nickname}
                                            onCommit={(value: string): void => {
                                                onChange(OrgKey.nickname, value)
                                            }} title={'Alternative Name'}
                                            helperText={'Other Names the Organization goes by'}
                                            placeholder={'Pirates Republic'}/>
                        <InputTextFieldCard defaultValue={organization.membersName}
                                            onCommit={(value: string): void => {
                                                onChange(OrgKey.membersName, value)
                                            }} title={'Name of Members'} helperText={'How members are referred to'}
                                            placeholder={'Pirates'}/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
