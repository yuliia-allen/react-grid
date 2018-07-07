import React from 'react';
import PropTypes from 'prop-types';
import { SortIcon } from './SortIcon';

export class HeaderCell extends React.Component {

    handleClick() {
        this.props.handleClick(this.props.name)
    }

    get GetHeaderText() {
        return this.props.text != null ? this.props.text :
            this.props.capitalizeHeader ? getCapiTalizeString(this.props.name) : this.props.name;
    }

    render() {
        return (
            <th className='grid-header' onClick={() => this.props.handleClick(this.props.name)}>
                <div className='grid-header-text'> {this.GetHeaderText}</div>
                {this.props.sort != null && <SortIcon sort={this.props.sort} />}
            </th>
        );
    }
}

HeaderCell.prototypes = {
    name: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
}

function getCapiTalizeString(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
}