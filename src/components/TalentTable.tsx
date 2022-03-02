import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

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

    public componentWillMount(): void {
        axios.get(this.state.apiurl).then(response => {
            this.setState({ datarecords: response.data });
            this.extractColumnNames();
        })
    }

    private extractColumnNames() {
        this.setState({ datacolumns: _.keys(this.state.datarecords[0]), });
    }

    private displayRecords(key: number) {
        return this.state.datacolumns.map((each_col) =>
            this.displayRecordName(each_col, key)
        )
    }

    private displayRecordName(colname: string, key: number) {
        return <TableCell>{this.state.datarecords[key][colname]}</TableCell>
    }

    private Capitalize(str: string) {
        return str.toUpperCase().replace("_", " ");
    }

    public render() {
        const datarecords = this.state.datarecords;
        const each_datarecord_keys = this.state.datacolumns;
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
                                    <TableCell scope="col">{this.Capitalize(each_datarecord_key)}</TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {datarecords && datarecords.map((each_datarecord, recordindex) =>
                                <TableRow key={each_datarecord.id}>
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