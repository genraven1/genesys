import TableCell from "@mui/material/TableCell";
import {Activation, ActorTalent} from "../../../models/Talent";
import Typography from "@mui/material/Typography";
import React, {Fragment} from "react";
import {GenesysDicePoolCenterTableCellButton} from "./TypographyTableCell";
import Actor from "../../../models/actor/Actor";

interface Props {
    actor: Actor
    talent: ActorTalent
}

export default function TalentActivationTableCell(props: Props) {
    const {actor, talent} = props;

    const renderTableCell = () => {
        switch (talent.activation) {
            case Activation.Passive:
                return <Typography>{talent.activation}</Typography>;
            case Activation.ActiveAction:
                return <GenesysDicePoolCenterTableCellButton actor={actor} skill={talent.talentSkillCheck.skill}
                                                             difficulty={talent.talentSkillCheck.difficulty}/>;
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