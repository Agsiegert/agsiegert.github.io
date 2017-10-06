const SearchResults = Scrivito.createObjClass({
  name: 'SearchResults',
  attributes: {
    navigationBackgroundImage: 'reference',
  },
});

Scrivito.provideEditingConfig(SearchResults, {
  title: 'Search Results',
  description: 'A search results page',
  attributesConfig: {
    navigationBackgroundImage: {
      title: 'Navigation Background Image',
      description: 'The background image of the navigation',
    },
  },
});

class SearchResultsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      q: props.params.q,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.q !== nextProps.params.q) {
      this.setState({ q: nextProps.params.q });
    }
  }

  render() {
    return (
      <div>
        <section className="bg-nav-content">
          <div className="container">
            <div className="nav-centered">
              <form onSubmit={ e => this.handleSubmit(e) } >
                <div className="input-group">
                  <input
                    className="form-control"
                    placeholder="Search for..."
                    value={ this.state.q }
                    onChange={ e => this.handleChange(e) }
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-primary"
                      type="submit"
                    >
                      <span className="hidden-xs">Search again</span>
                      <i className="fa fa-search fa-1" aria-hidden="true" />
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container">
            <h1 className="h2 border-bottom">XY search results</h1>
            {/* TODO: Tag selection */}
          </div>
        </section>
      </div>
    );
  }

  handleChange(event) {
    this.setState({ q: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    Scrivito.navigateTo(() => Scrivito.currentPage(), { q: this.state.q });
  }
}

Scrivito.provideComponent(SearchResults, SearchResultsComponent);

export default SearchResults;
