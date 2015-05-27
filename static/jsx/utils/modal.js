var scrollBarWidth = function() {
    var width;
    document.body.style.overflow = 'hidden';
    width = document.body.clientWidth;

    document.body.style.overflow = 'scroll';
    width -= document.body.clientWidth;
    if(!width) {
        width = document.body.offsetWidth - document.body.clientWidth;
    }

    document.body.style.overflow = '';
    return width;
};

var ModalCount = 0;

function modalWindowLock() {
    $('body').css({
        'overflow': 'hidden',
        'padding-right': scrollBarWidth()
    });
}

function modalWindowUnlock() {
    $('body').css({
        'overflow': '',
        'padding-right': ''
    });
}

var Modal = React.createClass({
    getDefaultProps: function() {
        return {
            containerClassName: 'modal-container',
            contentClassName: 'modal-content',
            modalClassName: ''
        };
    },
    getInitialState: function() {
        return {
            extraClassName: ''
        };
    },
    killClick: function(e) {
        // clicks on the content shouldn't close the modal
        e.stopPropagation();
    },
    componentDidMount: function() {
        ModalCount += 1;
        modalWindowLock();
        this.setState({
            extraClassName: 'open'
        });
    },
    handleBackdropClick: function() {
        // when you click the background, the user is requesting that the modal gets closed.
        // note that the modal has no say over whether it actually gets closed. the owner of the
        // modal owns the state. this just "asks" to be closed.
        this.props.onRequestClose();
        ModalCount -= 1;
        if (ModalCount == 0) {
            modalWindowUnlock();
        }
    },
    render: function() {
        var containerCls = this.props.containerClassName + ' ' + this.state.extraClassName + ' ' + this.props.modalClassName,
            cls = this.props.contentClassName + ' ' + this.props.modalClassName;

        return (
            <div {...this.props} className={containerCls} onClick={this.handleBackdropClick}>
                <div className={cls} onClick={this.killClick}>
                    <a href="javascript:;" role="button" className="modal-close" onClick={this.handleBackdropClick}></a>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

var ModalLink = React.createClass({
    mixins: [ReactLayeredComponentMixin],
    getDefaultProps: function() {
        return {
            modalClassName: ''
        };
    },
    handleClick: function() {
        this.setState({
            show: !this.state.show
        });
        $('#wrapper').toggleClass('blur');
        $('#footer').toggleClass('blur');
    },
    getInitialState: function() {
        return {
            show: false
        };
    },
    renderModal: function() {
        return this.props.children;
    },
    renderLayer: function() {
        if (!this.state.show) {
            return <span />;
        }
        var modal = this.renderModal();
        return (<Modal className={this.props.modalClassName} onRequestClose={this.handleClick}>{modal}</Modal>);
    },
    render: function() {
        return (
            <a href="javascript:;" role="button" className={this.props.className || ''} onClick={this.handleClick}>{this.props.name}</a>
        );
    }
});