const HeadlineWidget = Scrivito.createWidgetClass({
  name: 'HeadlineWidget',
  attributes: {
    headline: 'string',
    level: ['enum', { values: ['h1', 'h2', 'h3', 'h4'] }],
  },
});

Scrivito.provideUiConfig(HeadlineWidget, {
  title: 'HeadlineWidget',
  description: 'A widget with a headline.',
  attributes: {
    level: {
      title: 'Level',
      description: 'The level of the headline',
    },
  },
  titleForContent: widget => widget.get('headline'),
});

Scrivito.provideComponent(HeadlineWidget, {
  render() {
    const widget = this.props.widget;
    const level = widget.get('level') || 'h1';

    return <Scrivito.React.Content tag={ level } content={ widget } attribute="headline" />;
  },
});

export default HeadlineWidget;
