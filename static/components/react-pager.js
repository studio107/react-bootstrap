// Slighlty modified from underscore source
function range(start, stop) {
    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }

    var length = Math.max(stop - start, 0);
    var idx = 0;
    var arr = new Array(length);

    while(idx < length) {
        arr[idx++] = start;
        start += 1;
    }

    return arr;
}

/**
 * React Paginator
 *
 * @prop {number} numPages - Available number of pages
 * @prop {number} [maxPages] - Max number of pages to display
 * @prop {function} [onClick] - Fired on every click and passes the page number
 */
var Paginator = React.createClass({
    propTypes: {
        numPages: React.PropTypes.number.isRequired,
        maxPages: React.PropTypes.number,
        onClick: React.PropTypes.func
    },
    getDefaultProps: function() {
        return {
            small: false,
            reverse: false,
            maxPages: 3,
            splitTemplate: false,
            nextText: "Next",
            prevText: "Prev"
        };
    },
    getInitialState: function() {
        return {
            page: 1
        };
    },
    /**
     * Triggered by any button click within the paginator.
     *
     * @param {number} n - Page number
     */
    onClick: function(n) {
        // n is out of range, don't do anything
        if (n > this.props.numPages || n < 1) {
            return;
        }
        if (this.props.onClick) {
            this.props.onClick(n);
        }
        this.setState({
            page: n
        });
    },
    /**
     * Returns the number of page numbers
     */
    getDisplayCount: function() {
        // if (this.props.numPages > this.props.maxPages) {
        //     return this.props.maxPages;
        // }
        return this.props.numPages;
    },
    /**
     * Returns a range [start, end]
     */
    getPageRange: function() {
        var pageCount = 5,
            displayCount = this.getDisplayCount(),
            page = this.state.page,
        // Check position of cursor, zero based
            idx = (page - 1) % displayCount,
        // list should not move if cursor isn't passed this part of the range
            start = page - idx,
        // remaining pages
            remaining = this.props.numPages - page;

        // Don't move cursor right if the range will exceed the number of pages
        // in other words, we've reached the home stretch
        if (page > displayCount && remaining < displayCount) {
            // add 1 due to the implementation of `range`
            start = this.props.numPages - displayCount + 1;
        }

        var value = range(start, start + displayCount);
        if (this.props.small) {
            var index = value.indexOf(page);
            // Right part
            value.splice(index + pageCount - 1, value.length - index);
            // Left part
            value.splice(0, value.length - pageCount - 2);
        }
        return this.props.reverse ? value.reverse() : value;
    },
    preventDefault: function(e) {
        e.preventDefault();
    },

    render: function() {
        var page = this.state.page;
        var prevClassName = page === 1 ? 'disabled' : '';
        var nextClassName = page >= this.props.numPages ? 'disabled' : '';
        prevClassName += prevClassName.length == 0 ? "prev-page" : " prev-page";
        nextClassName += nextClassName.length == 0 ? "next-page" : " next-page";

        var html;
        if (this.props.splitTemplate) {
            html = (
                <div>
                    <ul className="pager">
                  {this.getPageRange().map(this.renderPage, this)}
                    </ul>
                    <ul className='pager-nav'>
                        <li className={prevClassName} onClick={this.onClick.bind(this, page - 1)}>
                            <a href='#' onClick={this.preventDefault}>
                            {this.props.prevText}
                            </a>
                        </li>
                        <li className={nextClassName} onClick={this.onClick.bind(this, page + 1)}>
                            <a href='#' onClick={this.preventDefault}>
                            {this.props.nextText}
                            </a>
                        </li>
                    </ul>
                </div>
            );
        } else {
            html = (
                <div>
                    <ul className='pager-full'>
                        <li className={prevClassName} onClick={this.onClick.bind(this, page - 1)}>
                            <a href='#' onClick={this.preventDefault}>
                            {this.props.prevText}
                            </a>
                        </li>
                  {this.getPageRange().map(this.renderPage, this)}
                        <li className={nextClassName} onClick={this.onClick.bind(this, page + 1)}>
                            <a href='#' onClick={this.preventDefault}>
                            {this.props.nextText}
                            </a>
                        </li>
                    </ul>
                </div>
            );
        }

        return (
            <div className="pager-container">
                {html}
            </div>
        );
    },

    renderPage: function(n, i) {
        var cls = this.state.page === n ? 'active' : '';
        return (
            <li key={i} className={cls} onClick={this.onClick.bind(this, n)}>
                <a href='#' onClick={this.preventDefault}>{n}</a>
            </li>
        );
    }
});