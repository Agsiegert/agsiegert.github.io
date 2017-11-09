import { registerTextExtract } from 'utils/text_extract_registry';
import { socialCardsAttributes } from '../_socialCardsAttributes';
import { defaultPageAttributes } from '../_defaultPageAttributes';

const LandingPage = Scrivito.provideObjClass('LandingPage', {
  attributes: {
    ...defaultPageAttributes,
    ...socialCardsAttributes,
  },
});

registerTextExtract('LandingPage', [
  { attribute: 'navigationSection', type: 'widgetlist' },
  { attribute: 'body', type: 'widgetlist' },
]);

export default LandingPage;
