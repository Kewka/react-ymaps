import YmapsEventHandler from '../types/YmapsEventHandler';

/**
 * Returns the props contained in the events map.
 * @param props The component props.
 * @param eventsMap The events map.
 */
export function getEventProps(
  props: object,
  eventsMap: { [key: string]: string },
): { [prop: string]: YmapsEventHandler } {
  return Object.keys(eventsMap).reduce((eventProps, eventProp) => {
    if (props[eventProp]) {
      eventProps[eventProp] = props[eventProp];
    }

    return eventProps;
  }, {});
}

/**
 * Adds event listener to Yandex maps object.
 * @param instance The Yandex maps object.
 * @param eventName The Yandex maps object event name.
 * @param handler The event handler.
 */
export function addEvent(
  instance: { events: ymaps.event.Manager },
  eventName: string,
  handler: YmapsEventHandler,
) {
  instance.events.add(eventName, handler);
}

/**
 * Removes event listener from Yandex maps object.
 * @param instance The Yandex maps object.
 * @param eventName The Yandex maps object event name.
 * @param handler The event handler.
 */
export function removeEvent(
  instance: { events: ymaps.event.Manager },
  eventName: string,
  handler: YmapsEventHandler,
) {
  instance.events.remove(eventName, handler);
}

/**
 * Replaces old event handlers with new event handlers.
 * If the handler was on the old map, but it is not on the new, then it will be deleted.
 * @param instance The Yandex maps object.
 * @param oldEvents The old events map.
 * @param newEvents The new events map.
 */
export function replaceEvents(
  instance: { events: ymaps.event.Manager },
  oldEvents: { [eventName: string]: YmapsEventHandler },
  newEvents: { [eventName: string]: YmapsEventHandler },
) {
  Object.keys({ ...oldEvents, ...newEvents }).forEach((eventName) => {
    if (oldEvents[eventName] !== newEvents[eventName]) {
      oldEvents[eventName] &&
        removeEvent(instance, eventName, oldEvents[eventName]);
      newEvents[eventName] &&
        addEvent(instance, eventName, newEvents[eventName]);
    }
  });
}

/**
 * Serializes the event map keys.
 * Example: { onClick: () => {} } -> { click: () => {} }
 * @param events The events map.
 */
export function serializeEventProps(
  events: {
    [prop: string]: YmapsEventHandler;
  },
  eventsMap: { [prop: string]: string },
) {
  return Object.keys(events).reduce(
    (output, propName) => ({
      ...output,
      [eventsMap[propName]]: events[propName],
    }),
    {},
  );
}
