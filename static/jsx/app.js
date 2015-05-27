var Link = ReactRouter.Link;
var RouteHandler = ReactRouter.RouteHandler;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var App = React.createClass({
    mixins: [StickyFooterMixin],
    renderLayer: function() {
        return <Footer />;
    },
    render: function() {
        return (
            <div id="wrapper">
                <Header />
                <RouteHandler {...this.props} />
                <p id="push"></p>
            </div>
        );
    }
});