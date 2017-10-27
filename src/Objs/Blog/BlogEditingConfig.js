import Blog from './Blog';
import { socialCardsCustomGroup } from '../_social_cards_attributes';

export default Scrivito.provideEditingConfig(Blog, {
  title: 'Blog',
  description: 'A Blog',
  attributesConfig: {
    title: {
      title: 'Title',
      description: 'Title of the blog. Only used for the navigation.',
    },
    navigationBackgroundImage: {
      title: 'Navigation Background Image',
      description: 'The background image of the navigation.',
    },
  },
  generalProperties: [
    'title',
    'navigationBackgroundImage',
  ],
  propertiesGroups: [socialCardsCustomGroup],
  titleForContent: obj => obj.get('title'),
});
