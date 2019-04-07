import YmapsContext from './YmapsContext';

describe('YmapsContext', () => {
  it('to be truthy', () => {
    expect(YmapsContext).toBeTruthy();
    expect(YmapsContext.Consumer).toBeTruthy();
    expect(YmapsContext.Provider).toBeTruthy();
  });
});
