var TaskTitle = React.createClass({
    getDefaultProps: function() {
        return {
            title: 'Unknown'
        };
    },
    render: function() {
        // Not need at this moment
        var backlink = false ? (
            <Link to="Tasks" className="task-back-link">{svg('left')} <span className="task-back-link-text">К списку задач</span></Link>
        ) : null;
        return (
            <div className="task-title-container">
                {backlink}
                <h1 className="title">{this.props.title}</h1>
            </div>
        );
    }
});