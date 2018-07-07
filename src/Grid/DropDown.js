import React from 'react';
import ReactDOM from 'react-dom';
import { Select } from './Select';

export class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            height: 0
        }

        this.onClick = this.onClick.bind(this);
        this.handleSelectionChanged = this.handleSelectionChanged.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    onClick() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    handleSelectionChanged(value) {
        if (value !== this.state.selectedItem) {
            this.props.onChange(value);
        }
        this.setState({
            isOpen: false
        });
    }

    handleDocumentClick(e) {
        if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
            this.setState({
                isOpen: false
            })
        }
    }

    componentDidMount() {
        let parent = ReactDOM.findDOMNode(this).parentNode;
        let parentHeight = parent.clientHeight;
        this.setState({ height: parentHeight });
        document.addEventListener("click", this.handleDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleDocumentClick);
    }

    render() {
        return (
            <div className='dropdown-wrapper' ref={(el)=>this.wrapperRef = el}>
                <div className='dropdown-header' onClick={this.onClick} style={{ height: this.state.height }}>
                    <div className='dropdown-header-text'>{this.props.selectedItem}</div>
                    <div className='dropdown-icon arrow-down'></div>
                </div>
                <Select selectedItem={this.props.selectedItem} options={this.props.options} height={this.state.selectHeight} visible={this.state.isOpen} onSelect={this.handleSelectionChanged} />
            </div>
        );
    }
}