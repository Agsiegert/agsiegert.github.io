import { Navbar as BootstrapNavbar } from 'react-bootstrap';
import Scroll from 'react-scroll';
import fullWidthTransformedUrl from 'utils/full_width_transformed_url';
import currentPageNavigationOptions from './navigation/current_page_navigation_options';
import Logo from './navigation/logo';
import Navbar from './navigation/navbar';
import NavigationSection from './navigation/navigation_section';
import ScrollToNextSectionLink from './navigation/scroll_to_next_section_link';
import { SearchBox, SearchIcon } from './navigation/search';

function FullNavigation({ bootstrapNavbarClassNames, toggleSearch, scrolled, navigationStyle }) {
  return (
    <BootstrapNavbar
      collapseOnSelect
      fixedTop
      className={ bootstrapNavbarClassNames.join(' ') }
    >
      <SearchBox toggleSearch={ toggleSearch } />

      <BootstrapNavbar.Header>
        <BootstrapNavbar.Toggle />
        <Logo scrolled={ scrolled } navigationStyle={ navigationStyle } />
        <SearchIcon toggleSearch={ toggleSearch } />
      </BootstrapNavbar.Header>

      <BootstrapNavbar.Collapse>
        <Navbar />
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}

function LandingPageNavigation({ navigationStyle }) {
  return (
    <div className="nav-landing-page">
      <Logo scrolled={ false } navigationStyle={ navigationStyle } />
    </div>
  );
}

function ActualNavigation(
  { isLandingPage, bootstrapNavbarClassNames, toggleSearch, scrolled, navigationStyle }
) {
  if (isLandingPage) {
    return <LandingPageNavigation navigationStyle={ navigationStyle } />;
  }

  return <FullNavigation
    bootstrapNavbarClassNames={ bootstrapNavbarClassNames }
    toggleSearch={ toggleSearch }
    scrolled={ scrolled }
    navigationStyle={ navigationStyle }
  />;
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: false,
      showSearch: false,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    // see https://stackoverflow.com/q/28633221/881759 for discussion about pageYOffset
    const scrollTop = event.currentTarget.pageYOffset;
    const scrolledToBe = scrollTop !== 0;

    if (this.state.scrolled !== scrolledToBe) {
      // only set state, if needed. Otherwise a render will be triggered on _every_ scroll.
      this.setState({ scrolled: scrolledToBe });
    }
  }

  toggleSearch() {
    this.setState({ showSearch: !this.state.showSearch });
  }

  render() {
    const {
      navigationStyle,
      backgroundImage,
      heigthClassName,
      useGradient,
      isLandingPage,
    } = currentPageNavigationOptions();

    const topSectionClassNames = ['navbar-fixed'];
    if (this.state.scrolled) {
      topSectionClassNames.push('scrolled');
    }

    if (navigationStyle === 'transparentDark') {
      topSectionClassNames.push('bg-dark-image');
    } else {
      topSectionClassNames.push('bg-white');
      topSectionClassNames.push('nav-only');
    }

    const bootstrapNavbarClassNames = [];
    if (this.state.showSearch) {
      bootstrapNavbarClassNames.push('show-search');
    }
    if (navigationStyle === 'transparentDark') {
      bootstrapNavbarClassNames.push('navbar-transparent');
    }

    const topSectionStyle = {};
    if (navigationStyle === 'transparentDark') {
      if (backgroundImage) {
        const backgroundUrl = fullWidthTransformedUrl(backgroundImage);
        if (useGradient) {
          topSectionStyle.background = 'no-repeat bottom / cover';
          topSectionStyle.backgroundImage = [
            'radial-gradient(ellipse at center, rgba(61,65,66,.5) 0%, rgba(61,65,66,1) 90%)',
            'linear-gradient(to bottom, rgba(61,65,66,0) 0%, rgba(61,65,66,1) 90%)',
            `url(${backgroundUrl})`,
          ].join(', ');
        } else {
          topSectionStyle.background = 'no-repeat center / cover';
          topSectionStyle.backgroundImage = [
            'linear-gradient(rgba(46, 53, 60, 0.7), rgba(46, 53, 60, 0.7))',
            `url(${backgroundUrl})`,
          ].join(', ');
        }
      }
      if (heigthClassName) {
        topSectionClassNames.push(heigthClassName);
      }
    }

    return (
      <div>
        <section className={ topSectionClassNames.join(' ') } style={ topSectionStyle }>
          <ActualNavigation
            isLandingPage={ isLandingPage }
            bootstrapNavbarClassNames={ bootstrapNavbarClassNames }
            toggleSearch={ this.toggleSearch }
            scrolled={ this.state.scrolled }
            navigationStyle={ navigationStyle }
          />

          <NavigationSection heigthClassName={ heigthClassName } />
          <ScrollToNextSectionLink heigthClassName={ heigthClassName } />
        </section>
        <Scroll.Element name="nextSection" />
      </div>
    );
  }
}

export default Scrivito.React.connect(Navigation);
