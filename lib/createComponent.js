
import RenderLayer from './RenderLayer';

let LAYER_GUID = 0;

function createComponent (name) {
  var ReactCanvasComponent = function (element) {
    this.node = null;
    this.subscriptions = null;
    this.listeners = null;
    this.node = new RenderLayer();
    this._mountImage = null;
    this._renderedChildren = null;
    this._mostRecentlyPlacedChild = null;
    this._currentElement = element;
    this._layerId = LAYER_GUID++;
  };
  ReactCanvasComponent.displayName = name;
  for (var i = 1, l = arguments.length; i < l; i++) {
    Object.assign(ReactCanvasComponent.prototype, arguments[i]);
  }

  return ReactCanvasComponent;
}

export default createComponent;
