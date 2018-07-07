import React from 'react';
import {pageSizes} from './Constants';
import { DropDown } from './DropDown';

export class Pager extends React.Component {
    constructor(props) {
        super(props);
        this.navigate = this.props.handleNavClick.bind(this);
        this.onPageChanged = this.onPageChanged.bind(this);
    }
    get PageCount() {
        if (this.props.total === 0)
            return 0;
        if (this.props.pageSize === pageSizes[0])
            return 1;
        return Math.ceil(this.props.total / this.props.pageSize);
    }

    onPageChanged(page) {
        this.navigate(page);
    }

    componentDidMount() {
        this.height = this.gridPagerWrapper.clientHeight;
    }

    render() {
        let currentPage = parseInt(this.props.currentPage, 10);
        let firstPrevButtonsDisabled = currentPage <= 1;
        let lastNextButtonsDisabled = currentPage === this.PageCount;
        let pageNumberOptions = [];
        for (var i = 1; i <= this.PageCount; i++) {
            pageNumberOptions.push(i);
        }
        return (
            <div className='grid-pager-wrap' ref={(el)=> this.gridPagerWrapper = el }>
                <button title='Go to the first page' className='pager-nav pager-first' disabled={firstPrevButtonsDisabled} onClick={() => this.navigate(1)}>
                    <span className='grid-icon icon-arrow-end-left'>First</span>
                </button>
                <button title='Go to the previous page' className='pager-nav pager-prev' disabled={firstPrevButtonsDisabled} onClick={() => this.navigate(currentPage - 1)}>
                    <span className='grid-icon icon-arrow-left'>Prev</span>
                </button>
                <DropDown selectedItem={currentPage} options={pageNumberOptions} onChange={this.onPageChanged} />
                <button title='Go to the next page' className='pager-nav pager-next' disabled={lastNextButtonsDisabled} onClick={() => this.navigate(currentPage + 1)}>
                    <span className='grid-icon icon-arrow-end-right'>Next</span>
                </button>
                <button title='Go to the last page' className='pager-nav pager-last' disabled={lastNextButtonsDisabled} onClick={() => this.navigate(this.PageCount)}>
                    <span className='grid-icon icon-arrow-right'>Last</span>
                </button>
                <DropDown selectedItem={this.props.pageSize} options={this.props.pageSizeOptions} onChange={this.props.onPageSizeChanged} />
                <span className='label'>items per page</span>
                <span className='info label'>{this.props.shownFrom} - {this.props.shownTo} of {this.props.total} items</span>
            </div>
        );
    }
}