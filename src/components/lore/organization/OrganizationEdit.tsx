import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {LorePath} from "../../../services/Path";
import {Card, CardContent, CardHeader, Divider, IconButton} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import * as React from "react";
import Organization, {DefaultOrganization} from "../../../models/lore/Organization";
import LoreService from "../../../services/LoreService";

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

    // const onNumberChange = async (key: keyof Armor, value: number) => {
    //     const copyArmor = {...organization} as Armor
    //     switch (key) {
    //         case 'defense':
    //             copyArmor.defense = value
    //             break
    //         case 'soak':
    //             copyArmor.soak = value
    //             break
    //         case 'rarity':
    //             copyArmor.rarity = value
    //             break
    //         case 'price':
    //             copyArmor.price = value
    //             break;
    //         case 'encumbrance':
    //             copyArmor.encumbrance = value
    //             break
    //         case 'slot':
    //         case 'name':
    //         case 'description':
    //         case "equipped":
    //         case "restricted":
    //             break;
    //     }
    //
    //     await updateArmor(copyArmor)
    // }
    //
    // const onChange = async (key: keyof Armor, value: string) => {
    //     if (value === null || (organization !== null && organization[key] === value)) {
    //         return;
    //     }
    //     const copyArmor = {...organization} as Armor
    //     switch (key) {
    //         case 'defense':
    //             copyArmor.defense = Number(value)
    //             break
    //         case 'soak':
    //             copyArmor.soak = Number(value)
    //             break
    //         case 'description':
    //             copyArmor.description = value
    //             break
    //         case 'rarity':
    //             copyArmor.rarity = Number(value)
    //             break
    //         case 'price':
    //             copyArmor.price = Number(value)
    //             break;
    //         case "restricted":
    //             copyArmor.restricted = !Boolean(copyArmor.restricted)
    //             break
    //         case 'encumbrance':
    //             copyArmor.encumbrance = Number(value)
    //             break
    //         case "equipped":
    //             copyArmor.equipped = !Boolean(copyArmor.equipped)
    //             break
    //         case 'slot':
    //         case 'name':
    //             break;
    //     }
    //
    //     await updateArmor(copyArmor)
    // }

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
            </IconButton>}/>
            <Divider />
            <CardContent>
            </CardContent>
        </Card>
    )
}
