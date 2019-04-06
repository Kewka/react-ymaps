import { JSDOM, VirtualConsole } from 'jsdom';

const virtualConsole = new VirtualConsole();

virtualConsole.on('jsdomError', (error) => {
  console.error('JSDOM error: ' + error.message);
});

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  runScripts: 'dangerously',
  resources: 'usable',
  url: 'https://react.ymaps',
  referrer: 'https://react.ymaps',
  virtualConsole,
});

const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.requestAnimationFrame = function(callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function(id) {
  clearTimeout(id);
};

//
// Mock Canvas / Context2D calls
//
window.HTMLCanvasElement.prototype.getContext = function() {
  return {
    fillRect() {},
    clearRect() {},
    getImageData(x, y, w, h) {
      return {
        data: new Array(w * h * 4),
      };
    },
    putImageData() {},
    createImageData() {
      return [];
    },
    setTransform() {},
    drawImage() {},
    save() {},
    fillText() {},
    restore() {},
    beginPath() {},
    moveTo() {},
    lineTo() {},
    closePath() {},
    stroke() {},
    translate() {},
    scale() {},
    rotate() {},
    arc() {},
    fill() {},
    measureText() {
      return { width: 0 };
    },
    transform() {},
    rect() {},
    clip() {},
  };
};

window.HTMLCanvasElement.prototype.toDataURL = function() {
  return '';
};

copyProps(window, global);
