import {
  replaceEvents,
  addEvent,
  removeEvent,
  getEventProps,
  serializeEventProps,
} from './events';
import { YandexApi } from '../lib/YandexApi';
import Ymaps from '../types/Ymaps';

describe('utils/events', () => {
  const generatePlacemark = (ymaps: Ymaps) => new ymaps.Placemark([0, 0], {});

  it('getEventProps', () => {
    const eventsMap = {
      onClick: 'click',
      onChange: 'change',
    };
    const props = {
      id: 123,
      value: 'value',
      onClick: jest.fn(),
      onSomeEvent: jest.fn(),
    };
    const eventProps = getEventProps(props, eventsMap);
    expect(eventProps).toEqual({ onClick: props.onClick });
  });

  it('addEvent', async () => {
    const handler = jest.fn();
    const ymaps = await YandexApi.load();
    const placemark = generatePlacemark(ymaps);
    addEvent(placemark, 'click', handler);
    placemark.events.fire('click', {});
    expect(handler).toBeCalled();
  });

  it('removeEvent', async () => {
    const handler = jest.fn();
    const ymaps = await YandexApi.load();
    const placemark = generatePlacemark(ymaps);
    addEvent(placemark, 'click', handler);
    removeEvent(placemark, 'click', handler);
    placemark.events.fire('click', {});
    expect(handler).not.toBeCalled();
  });

  it('replaceEvents', async () => {
    const defaultHandlers = {
      click: jest.fn(),
    };
    const newHandlers = {
      click: jest.fn(),
    };

    const ymaps = await YandexApi.load();
    const placemark = generatePlacemark(ymaps);
    addEvent(placemark, 'click', defaultHandlers.click);
    replaceEvents(placemark, defaultHandlers, newHandlers);
    placemark.events.fire('click', {});
    expect(defaultHandlers.click).not.toBeCalled();
    expect(newHandlers.click).toBeCalled();
  });

  it('serializeEventProps', () => {
    const eventsMap = {
      onClick: 'click',
      onClose: 'close',
    };
    const eventProps = {
      onClick: jest.fn(),
      onClose: jest.fn(),
    };
    const serializedEventProps = serializeEventProps(eventProps, eventsMap);
    expect(serializedEventProps).toEqual({
      [eventsMap.onClick]: eventProps.onClick,
      [eventsMap.onClose]: eventProps.onClose,
    });
  });
});
