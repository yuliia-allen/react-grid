import React from 'react';
import PropTypes from 'prop-types';
import { pageSizes } from './Constants';
import { HeaderRow } from './HeaderRow';
import { Row } from './Row';
import { Pager } from './Pager';
import { Scrollbars } from 'react-custom-scrollbars';
//uses https://www.npmjs.com/package/react-custom-scrollbars

export class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data != null ? props.data : [],
            sortColumn: null,
            sortOrder: true, // by default sortOrder is ASC,
            currentPage: 1,
            pageSize: pageSizes[1],
            height: 0,
            scrollWidth: 0,
            hasScrollBar: false
        }
        this.handleHeaderClick = this.handleHeaderClick.bind(this);
        this.navigateToPage = this.navigateToPage.bind(this);
        this.compare = this.compare.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
    }

    compare(a, b) {
        return compare(a, b, this.state.sortColumn, this.state.sortOrder);
    }

    handleHeaderClick(sortColumn) {
        let newSortOrder = true;
        if (sortColumn === this.state.sortColumn) {
            newSortOrder = !this.state.sortOrder;
        }
        this.setState({
            sortColumn: sortColumn,
            sortOrder: newSortOrder
        })
    }

    get PageSize() {
        if (this.state.pageSize === pageSizes[0])
            return this.state.data.length;
        return parseInt(this.state.pageSize, 10);
    }

    navigateToPage(pageNumber) {
        if (this.state.currentPage !== pageNumber) {
            this.setState({ currentPage: pageNumber });
        }
    }

    changePageSize(newPageSize) {
        if (newPageSize !== this.state.pageSize) {
            this.setState({ pageSize: newPageSize, currentPage: 1 });
        }
    }

    hasScrollBar() {
        return this.gridContentContainer.scrollHeight > this.gridContentContainer.clientHeight;
    }

    componentDidMount() {
        let gridContentHeight = this.gridContainer.parentNode.clientHeight - this.Header.height - this.Pager.height;
        this.setState({ height: gridContentHeight});
    }


    render() {
        let data = this.state.data;
        if (this.state.sortColumn != null) {
            data.sort(this.compare);
        }
        var rows = [];
        let pageSize = this.PageSize;
        let showFromIndex = (this.state.currentPage - 1) * pageSize;
        let showToIndex = showFromIndex + pageSize;
        for (var i = showFromIndex; i < showToIndex; i++) {
            rows.push(<Row key={i} value={data[i]} />);
        }

        return (<div className='grid-container' ref={(el) => this.gridContainer = el}>
            <HeaderRow ref={(el) => this.Header = el} value={data.length > 0 ? data[0] : {}} handleClick={this.handleHeaderClick} sortColumn={this.state.sortColumn} sortOrder={this.state.sortOrder}/>
            <div className='grid-content' style={{ height: this.state.height }} ref={(el) => this.gridContentContainer = el}>
                <Scrollbars style={{ height: this.state.height }}>
                    <table>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </Scrollbars>
            </div>
            <Pager ref={(el) => this.Pager = el} total={data.length} shownFrom={showFromIndex + 1} shownTo={Math.min(showToIndex, data.length)} currentPage={this.state.currentPage} pageSize={this.state.pageSize} handleNavClick={this.navigateToPage} pageSizeOptions={pageSizes} onPageSizeChanged={this.changePageSize} />
        </div>);
    }
}

Grid.prototypes = {
    data: PropTypes.array.isRequired
}

function compare(a, b, sortFieldName, compareDesc) {
    let valueA = a[sortFieldName];
    let valueB = b[sortFieldName];
    if (typeof valueA === "string") {
        var str1 = valueA.toLowerCase();
        var str2 = valueB.toLowerCase();
        if (compareDesc)
            return str1.localeCompare(str2);
        return -str1.localeCompare(str2);
    }
    if (typeof valueA === "number") {
        if (compareDesc)
            return valueB - valueA;
        return valueA - valueB;
    }
    return 0;
}