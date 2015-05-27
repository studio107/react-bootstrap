var IndexHandler = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="columns large-12">
                    <h1>Hello world</h1>
                    <ul>
                        <li>
                            <Link to="Hello" params={{name: "john"}}>Hello link</Link>
                        </li>
                        <li>
                            <ModalLink name="Hello modal">
                                Hello modal
                            </ModalLink>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});