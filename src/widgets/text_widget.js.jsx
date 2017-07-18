const TextWidget = Scrivito.createWidgetClass({
  name: 'TextWidget',
  attributes: {
    text: 'html',
    centered: ['enum', { validValues: ['yes', 'no'] }],
  },
});

Scrivito.provideUiConfig(TextWidget, {
  title: 'Text',
  description: 'A widget with html text.',
  attributes: {
    centered: {
      title: 'Centered',
      description: 'Should this text be centered?',
    },
  },
});

Scrivito.provideComponent(TextWidget, widget =>
  <Scrivito.React.Content
    tag="div"
    className={ widget.get('centered') === 'yes' && 'text-center' }
    content={ widget }
    attribute="text"
    />
);

export default TextWidget;
