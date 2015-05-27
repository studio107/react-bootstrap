var Audio = React.createClass({
    getDefaultProps: function() {
        return {
            src: ''
        };
    },
    render: function() {
        return (
            <audio id="audio" src={this.props.src}></audio>
        );
    }
});