import React from 'react';

export class Select extends React.Component {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(e) {
        let newSelectedValue = e.target.getAttribute('value');
        this.props.onSelect(newSelectedValue);
    }
    componentDidMount() {
        this.setListContainerHeight();
    }

    componentDidUpdate() {
        this.setListContainerHeight();
    }

    setListContainerHeight() {
        this.listContainer.style.height = (this.props.visible ? this.ulElement.clientHeight : 0) + "px";
    }

    render() {
        var options = this.props.options.map((value, index) => {
            let selected = value == this.props.selectedItem;
            return <li value={value} key={index} className={(selected ? 'selected' : '') + ' dropdown-li'} onClick={this.onSelect}>{value}</li>;
        });
        return (
            <div className={'dropdown-list-container ' + (this.props.visible ? 'expanded' : 'collapsed')} ref={(el) => this.listContainer = el}>
                <ul ref={(el) => this.ulElement = el}>{options}</ul>
            </div>
        );
    }
}