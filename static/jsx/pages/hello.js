var HelloHandler = React.createClass({
    render: function() {
        var name = this.props.params.name;
        return (
            <div className="row">
                <div className="columns large-12">
                    <h1>Hello {name}</h1>
                </div>
            </div>
        );
    }
});