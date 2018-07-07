import React from 'react';

export class Cell extends React.Component {
    render() {
        return (
            <td className='grid-cell'>
                {this.props.text}
            </td>
        );
    }
}