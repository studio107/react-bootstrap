var Route = ReactRouter.Route;
var NotFoundRoute = ReactRouter.NotFoundRoute;
var DefaultRoute = ReactRouter.DefaultRoute;

var routes = (
    <Route handler={App} path='/'>
        <DefaultRoute handler={IndexHandler} />
        <Route name='Index' path='/' handler={IndexHandler} />
        <Route name='Hello' path='/hello/:name' handler={HelloHandler} />
        <NotFoundRoute name='notfound' handler={NotFoundPage} />
    </Route>
);

ReactRouter.run(routes, ReactRouter.HistoryLocation, function(Handler, state) {
    React.render(<Handler params={state.params} query={state.query} />, document.body);
});