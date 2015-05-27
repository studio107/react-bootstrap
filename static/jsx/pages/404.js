var NotFoundPage = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="columns large-10">
            <div className="not-found-page">
                <h1>Страница не найдена</h1>
                <p><Link to="/">Перейти на главную</Link></p>
            </div>
        </div>
      </div>
    );
  }
});