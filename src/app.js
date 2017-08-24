import CurrentPageTitle from 'components/current_page_title';
import Footer from 'components/footer';
import Navigation from 'components/navigation';
import NotFoundErrorPage from 'components/not_found_error_page';
import InternalErrorPage from 'components/internal_error_page';

export default function App() {
  return (
    <div>
      <div className="content-wrapper">
        <Navigation />
        <Scrivito.React.CurrentPage />
        <NotFoundErrorPage />
        <InternalErrorPage />
      </div>
      <Footer />
      <CurrentPageTitle />
    </div>
  );
}
