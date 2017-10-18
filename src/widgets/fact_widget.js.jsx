import { registerTextExtract } from 'utils/text_extract_registry';

const FactWidget = Scrivito.createWidgetClass({
  name: 'FactWidget',
  attributes: {
    key: 'string',
    value: 'string',
  },
});

registerTextExtract('FactWidget', [
  { attribute: 'key', type: 'string' },
  { attribute: 'value', type: 'string' },
]);

Scrivito.provideEditingConfig(FactWidget, {
  title: 'Fact',
  description: 'A widget with colored fact above a description.',
});

Scrivito.provideComponent(FactWidget, ({ widget }) =>
  <div className="fact">
    <Scrivito.ContentTag
      content={ widget }
      attribute="value"
      className="value"
      tag="span"
    />
    <Scrivito.ContentTag
      content={ widget }
      attribute="key"
      className="key"
      tag="span"
    />
  </div>
);

export default FactWidget;
