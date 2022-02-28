import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

export interface IState {
    apiurl: string;
    datarecords: any[];
    datacolumns: any[];
}

class BuildDynamicTable extends React.Component<typeof useParams, IState> {
    constructor(props: typeof useParams) {
        super(props);
        this.state = { 
             apiurl: "http://localhost:8080/talents",
             datarecords: [], 
             datacolumns: [],
        }
    }
    
    public componentWillMount(): void {
        axios.get(this.state.apiurl).then(response => {
         this.setState({datarecords: response.data});
          this.extractColumnNames();
        })
    }

    private extractColumnNames() { 
        this.setState({datacolumns: _.keys(this.state.datarecords[0]),});
    }

    private displayRecords(key: number) {
    	return this.state.datacolumns.map((each_col) => 
    		this.displayRecordName(each_col,key)
    	) 
    }

    private displayRecordName(colname:string, key:number){
    	return <th>{this.state.datarecords[key][colname]}</th> 
    }

    private Capitalize(str: string){
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
                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                             <tr>
                             {each_datarecord_keys && each_datarecord_keys.map(each_datarecord_key => 
                            <th scope="col">{this.Capitalize(each_datarecord_key)}</th>
                                )}
                                <th scope="col">Actions</th>
                                </tr>
                            </thead>                            
                            <tbody> 
                            {datarecords && datarecords.map((each_datarecord, recordindex) =>
                                <tr key={each_datarecord.id}>
                                {this.displayRecords(recordindex)}
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default BuildDynamicTable;