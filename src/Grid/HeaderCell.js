import React from 'react';
import PropTypes from 'prop-types';
import { SortIcon } from './SortIcon';

export class HeaderCell extends React.Component {

    handleClick(){
        this.props.handleClick(this.props.name)
    }

    render() {
        return (
            <th className='grid-header' onClick={()=>this.props.handleClick(this.props.name)}>
                <div className='grid-header-text'> {this.props.text != null ? this.props.text : this.props.name}</div>
                {this.props.sort != null && <SortIcon sort={this.props.sort} />}
            </th>
        );
    }
}

HeaderCell.prototypes = {
    name: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
}