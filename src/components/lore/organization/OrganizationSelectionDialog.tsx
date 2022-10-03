import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Dialog, DialogActions, DialogContentText, DialogTitle} from "@mui/material";
import LoreService from "../../../services/LoreService";
import {DefaultOrganization, Organization, OrgType} from "../../../models/lore/Organization";
import {LorePath} from "../../../services/Path";


interface Props {
    open: boolean
    onClose: () => void
    name: string
}

export default function OrganizationSelectionDialog(props: Props): JSX.Element {
    const {open,onClose,name} = props
    const path = LorePath.Organization
    const [organization, setOrganization] = useState<Organization | null>(null)
    let navigate = useNavigate();

    const handleSelection = async (): Promise<void> => {
        await LoreService.updateOrganization(name, organization)
        navigate(path + name + '/edit')
        onClose()
    }

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
            return 'Organization Selection'
        }
        return org.name
    }

    function getOrganization(org: Organization | null): Organization {
        if (!org) {
            return DefaultOrganization.create()
        }
        return org
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{getName(organization)}</DialogTitle>
            <DialogContentText>

            </DialogContentText>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={handleSelection}>START EDITING</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}