import MapContext from './MapContext';

describe('MapContext', () => {
  it('to be truthy', () => {
    expect(MapContext).toBeTruthy();
    expect(MapContext.Consumer).toBeTruthy();
    expect(MapContext.Provider).toBeTruthy();
  });
});
