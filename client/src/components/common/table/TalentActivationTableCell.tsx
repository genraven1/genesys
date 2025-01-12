import TableCell from "@mui/material/TableCell";
import {Activation, ActorTalent} from "../../../models/Talent";
import Typography from "@mui/material/Typography";
import React, {Fragment} from "react";

interface Props {
    talent: ActorTalent
}

export default function TalentActivationTableCell(props: Props) {
    const {talent} = props;

    const renderTableCell = () => {
        switch (talent.activation) {
            case Activation.Passive:
                return <Typography>{talent.activation}</Typography>
            case Activation.ActiveAction:
                break;
            case Activation.ActiveManeuver:
                break;
            case Activation.ActiveIncidental:
                return (
                    // <Button onClick={}>
                    //
                    // </Button>
                    <Fragment/>
                )
            case Activation.ActiveIncidentalOutOfTurn:
                break;
        }
    };

    return (
        <TableCell align='center'>
            {renderTableCell()}
        </TableCell>
    );
}