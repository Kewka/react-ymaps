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

  it('load the ymaps instance with invalid version', async () => {
    const options: YandexApiOptions = {
      version: '9999.99', // invalid version
      force: true,
    };

    await expect(YandexApi.load(options)).rejects.toThrow();
  });
});
