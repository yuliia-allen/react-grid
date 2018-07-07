import React from 'react';
import {Cell} from './Cell';

export class Row extends React.Component {
    render() {
        let value = this.props.value;
        let cells = [];
        for(var prop in value){
            cells.push(<Cell text={value[prop]} key={prop} />)
        }        
        return (
            <tr className='grid-row'>  
                {cells}
            </tr>
        );
    }
}