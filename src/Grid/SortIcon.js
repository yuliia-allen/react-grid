import React from 'react';

export class SortIcon extends React.Component {
    render() {
        let className = 'grid-sort-icon ' + (this.props.sort ? 'sort-asc' : 'sort-desc');
        return (
            <div className={className}>
            </div>
        );
    }
}