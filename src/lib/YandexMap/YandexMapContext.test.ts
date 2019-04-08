import YandexMapContext from './YandexMapContext';

describe('YandexMapContext', () => {
  it('to be truthy', () => {
    expect(YandexMapContext).toBeTruthy();
    expect(YandexMapContext.Consumer).toBeTruthy();
    expect(YandexMapContext.Provider).toBeTruthy();
  });
});
