import Nemesis from "../../../../models/actor/npc/Nemesis";
import * as React from "react";
import {Fragment} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {ActorSkill} from "../../../../models/actor/Actor";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {Grid, Typography} from "@mui/material";
import {SkillType} from "../../../../models/actor/Skill";
import GenesysSkillDiceTypography from "../../../common/GenesysSkillDiceTypography";
import {CharacteristicType} from "../../../../models/actor/Characteristics";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";

interface RowProps {
    skill: ActorSkill,
    nemesis: Nemesis
}

function SkillRow(props: RowProps): JSX.Element {
    const { skill, nemesis } = props;

    const setName = (): string => {
        return skill.name + '(' + skill.characteristic + ')'
    }

    const getCharacteristicRanks = (): number => {
        switch (skill.characteristic) {
            case CharacteristicType.Agility:
                return nemesis.agility.current
            case CharacteristicType.Brawn:
                return nemesis.brawn.current
            case CharacteristicType.Cunning:
                return nemesis.cunning.current
            case CharacteristicType.Intellect:
                return nemesis.intellect.current
            case CharacteristicType.Presence:
                return nemesis.presence.current
            case CharacteristicType.Willpower:
                return nemesis.willpower.current
        }
    }

    return (
        <Fragment>
            <TableRow>
                <TableCell>{setName()}</TableCell>
                <TableCell>
                    <GenesysSkillDiceTypography characteristicRanks={getCharacteristicRanks()} skillRanks={skill.ranks} />
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

interface GroupProps {
    nemesis: Nemesis,
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {nemesis, type} = props

    return (
        <Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} style={{textAlign: "center"}}>{type}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(nemesis?.skills!! || []).filter((skill) => skill.type === type).map((row: ActorSkill) => (
                        <SkillRow key={row.name} skill={row} nemesis={nemesis}/>
                    ))}
                </TableBody>
            </Table>
        </Fragment>
    )
}

interface TableProps {
    nemesis: Nemesis
}

export default function ViewNemesisSkillTable(props: TableProps) {
    const {nemesis} = props;
    return (
        <Fragment>
            <Typography>{'Skills'}</Typography>
            <Grid container>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableBody>
                                <SkillTypeGroup nemesis={nemesis} type={SkillType.General}/>
                                <SkillTypeGroup nemesis={nemesis} type={SkillType.Magic}/>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableBody>
                                <SkillTypeGroup nemesis={nemesis} type={SkillType.Combat}/>
                                <SkillTypeGroup nemesis={nemesis} type={SkillType.Social}/>
                                <SkillTypeGroup nemesis={nemesis} type={SkillType.Knowledge}/>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Fragment>
    )
}