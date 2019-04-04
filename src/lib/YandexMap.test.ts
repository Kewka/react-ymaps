import YandexMap from '~/lib/YandexMap';

describe('YandexMap', () => {
  it('to be truthy', () => {
    expect(YandexMap).toBeTruthy();
  });

  it('load', () => {
    expect(YandexMap.load()).toBe('Loading...');
  });
});
