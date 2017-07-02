'use strict';

import Surface from './Surface';
import Layer from './Layer';
import Image from './Image';
import ListView from './ListView';
import Group from './Group';
var ReactCanvas = {
  Surface,
  Layer,
  Group,
  Image,
  Text: require('./Text'),
  ListView,
  Gradient: require('./Gradient'),

  FontFace: require('./FontFace'),
  measureText: require('./measureText'),
  createCanvasComponent: require('./createCanvasComponent'),
  FrameUtils: require('./FrameUtils'),
  registerLayerType: require('./DrawingUtils').registerLayerType
};

module.exports = ReactCanvas;
