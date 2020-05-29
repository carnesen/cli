import { TextList } from './text-list';

describe(TextList.name, () => {
  it('Creates a usage string for a branch', () => {
    const usageString = TextList(
      { name: 'foo', text: 'hi\n   bye' },
      { name: 'barrio', text: 'bye' },
    );
    expect(usageString).toMatchSnapshot();
  });
});
