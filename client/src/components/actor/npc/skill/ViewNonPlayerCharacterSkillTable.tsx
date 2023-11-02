import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";
import GenesysSkillDiceTypography from "../../../common/typography/GenesysSkillDiceTypography";
import {SkillType} from "../../../../models/actor/Skill";
import {ActorSkill, getCharacteristicRanks, setSkillName} from "../../../../models/actor/Actor";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import {renderHeaders} from "../../../common/table/TableRenders";

interface GroupProps {
    npc: SingleNonPlayerCharacter,
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {npc, type} = props
    const headers = ['Name', 'Dice Pool']

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TypographyCenterTableCell value={type} span={2}/>
                </TableRow>
                {renderHeaders(headers)}
            </TableHead>
            <TableBody>
                {(npc?.skills!! || [])
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .filter((skill) => skill.type === type)
                    .map((actorSkill: ActorSkill) => (
                        <TableRow>
                            <TypographyCenterTableCell value={setSkillName(actorSkill)}/>
                            <TableCell style={{textAlign: 'center'}}>
                                {<GenesysSkillDiceTypography characteristicRanks={getCharacteristicRanks(npc, actorSkill)}
                                                             skillRanks={actorSkill.ranks}/>}
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    )
}

interface TableProps {
    npc: SingleNonPlayerCharacter
}

export default function ViewNonPlayerCharacterSkillTable(props: TableProps) {
    const {npc} = props

    return (
        <Grid container>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <SkillTypeGroup npc={npc} type={SkillType.General}/>
                            <SkillTypeGroup npc={npc} type={SkillType.Magic}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <SkillTypeGroup npc={npc} type={SkillType.Combat}/>
                            <SkillTypeGroup npc={npc} type={SkillType.Social}/>
                            <SkillTypeGroup npc={npc} type={SkillType.Knowledge}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}