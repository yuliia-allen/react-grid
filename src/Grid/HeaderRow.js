import React from 'react';
import { HeaderCell } from './HeaderCell';

export class HeaderRow extends React.Component {

    componentDidMount() {
        this.height = this.gridHeaderWrapper.clientHeight;
    }

    render() {
        let value = this.props.value;
        let headers = [];
        for (var prop in value) {
            let sort = null;
            if (prop === this.props.sortColumn) {
                sort = this.props.sortOrder;
            }
            headers.push(<HeaderCell name={prop} key={prop} handleClick={this.props.handleClick} sort={sort} />)
        }

        return (
            <div className='grid-header-wrapper' ref={(el) => this.gridHeaderWrapper = el}>
                <div className='grid-header-content' style={{ paddingRight: this.props.paddingRight }}>
                    <table>
                        <thead>
                            <tr>
                                {headers}
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        );
    }
}