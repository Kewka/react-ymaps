import YandexApi, { YandexApiOptions } from './YandexApi';

describe('YandexApi', () => {
  it('to be truthy', () => {
    expect(YandexApi).toBeTruthy();
  });

  it('load the ymaps instance', async () => {
    const options: YandexApiOptions = {
      lang: 'en_RU',
      force: true,
    };

    const ymaps = await YandexApi.load(options);

    expect(ymaps).toBeTruthy();
    expect(ymaps.meta.languageCode).toBe('en');
    expect(ymaps.meta.countryCode).toBe('RU');
  });

  // TODO: add more tests.
});
