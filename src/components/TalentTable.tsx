import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse } from '@mui/material';
import TalentService from '../services/TalentService';
import Talent from '../models/Talent';

export interface IState {
    apiurl: string;
    datarecords: any[];
    datacolumns: any[];
    open: boolean;
}

class BuildDynamicTable extends React.Component<typeof useParams, IState> {
    constructor(props: typeof useParams) {
        super(props);
        this.state = {
            apiurl: "http://localhost:8080/talents",
            datarecords: [],
            datacolumns: [],
            open: false
        }
    }

    public componentDidMount(): void {
        TalentService.getTalents().then(talents => {
            this.setState({ datarecords: talents });
            this.extractColumnNames();
        })
    }

    private extractColumnNames() {
        this.setState({ datacolumns: _.keys(this.state.datarecords[0]), });
    }

    private displayRecords(key: number) {
        return this.state.datacolumns.map((each_col) =>
            {
                console.log(key)
                return this.displayRecordName(each_col, key);
            },
        )
    }

    private displayRecordName(colname: string, key: number) {
        return <TableCell>{this.state.datarecords[key][colname]}</TableCell>
    }

    private convertToTableHeader(str: string) {
        return str.toUpperCase().replace("_", " ");
    }

    public render() {
        const datarecords = this.state.datarecords;
        const each_datarecord_keys = this.state.datacolumns;
        const description_datarecord = datarecords.pop;
        const description_key = each_datarecord_keys.pop;

        return (
            <div>
                {datarecords.length === 0 && (
                    <div className="text-center">
                        <h2>No datarecords found at the moment</h2>
                    </div>
                )}
                <TableContainer component={Paper}>
                    <Table className="table table-bordered">
                        <TableHead className="thead-light">
                            <TableRow>
                                {each_datarecord_keys && each_datarecord_keys.map(each_datarecord_key =>
                                    <TableCell scope="col">{this.convertToTableHeader(each_datarecord_key)}</TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {datarecords && datarecords.map((each_datarecord, recordindex) =>
                                <TableRow key={each_datarecord.name}>
                                    {this.displayRecords(recordindex)}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default BuildDynamicTable;