import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Fragment, useEffect, useState} from 'react';
import * as React from 'react';
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import ActionsTableCell from "../common/table/ActionsTableCell";
import {Path} from "../../services/Path";
import Quality from "../../models/Quality";
import GenesysQualityTypography from "../common/typography/GenesysQualityTypography";
import QualityService from "../../services/QualityService";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import {Button, Card, CardContent, CardHeader, Divider} from "@mui/material";
import QualityDialog from "./QualityDialog";
import {renderHeaders} from "../common/table/TableRenders";

interface RowProps {
    quality: Quality
}

function Row(props: RowProps): JSX.Element {
    const {quality} = props
    const [open, setOpen] = useState(false)

    const renderActivation = (): JSX.Element => {
        if (quality?.passive!! === undefined) {
            return <Fragment/>
        }
        if (quality?.passive!!) {
            return <GenesysDescriptionTypography text={'Passive'}/>
        } else {
            return <GenesysQualityTypography ranks={quality?.cost}/>
        }
    }

    const renderUsable = (): JSX.Element => {
        if (quality?.weapon!! === undefined && quality?.armor!! === undefined) {
            return <Fragment/>
        }
        let usable = ''
        if (quality?.weapon!! && !Boolean(quality?.armor!!)) {
            usable = 'Weapons'
        } else if (quality?.armor!! && !Boolean(quality?.weapon!!)) {
            usable = 'Armor'
        } else {
            usable = 'Weapons and Armor'
        }
        return <GenesysDescriptionTypography text={usable}/>
    }

    return (
        <Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}} onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={quality.name}/>
                <TableCell style={{textAlign: 'center'}}>{renderActivation()}</TableCell>
                <TableCell style={{textAlign: 'center'}}>{renderUsable()}</TableCell>
                <ActionsTableCell id={String(quality.id)} path={Path.Qualities}/>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    <GenesysDescriptionTypography text={quality.description}/>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function ViewAllQualities() {
    const [qualities, setQualities] = useState<Quality[]>([])
    const [openQualityCreationDialog, setOpenQualityCreationDialog] = useState(false)
    const headers = ['Name', 'Activation', 'Usable On', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            const qualitiesList = await QualityService.getQualities()
            if (!qualitiesList) {
                return
            }
            setQualities(qualitiesList)
        })()
    }, [])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Qualities'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenQualityCreationDialog(true)}>Create Quality</Button>}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            {renderHeaders(headers)}
                        </TableHead>
                        <TableBody>
                            {qualities.map((quality: Quality) => (
                                <Row key={quality.name} quality={quality}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openQualityCreationDialog && <QualityDialog open={openQualityCreationDialog}
                                                         onClose={(): void => setOpenQualityCreationDialog(false)}/>}
        </Card>
    );
}
