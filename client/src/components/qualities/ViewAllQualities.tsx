import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Fragment, useEffect, useState} from 'react';
import * as React from 'react';
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import ActionsTableCell from "../common/table/ActionsTableCell";
import {RootPath} from "../../services/Path";
import Quality from "../../models/Quality";
import GenesysQualityTypography from "../common/typography/GenesysQualityTypography";
import QualityService from "../../services/QualityService";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import {Button, Card, CardContent, CardHeader, Divider} from "@mui/material";
import QualityDialog from "./QualityDialog";
import {renderSingleRowTableHeader} from "../common/table/TableRenders";
import {renderUsable} from "../../models/equipment/EquipmentHelper";

interface RowProps {
    quality: Quality
}

function Row(props: RowProps) {
    const {quality} = props
    const [open, setOpen] = useState(false)

    const renderActivation = () => {
        if (quality.passive === undefined) {
            return <Fragment/>
        }
        if (quality.passive) {
            return <GenesysDescriptionTypography text={'Passive'}/>
        } else {
            return <GenesysQualityTypography ranks={quality.cost}/>
        }
    }

    return (
        <Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}} onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={quality.name}/>
                <TableCell style={{textAlign: 'center'}}>{renderActivation()}</TableCell>
                <TypographyCenterTableCell value={renderUsable(quality)}/>
                <ActionsTableCell name={quality.id} path={RootPath.Qualities}/>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Table size="small">
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
            setQualities(await QualityService.getQualities())
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
                        {renderSingleRowTableHeader(headers)}
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
