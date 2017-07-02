'use strict';

import Surface from './Surface';
import Layer from './Layer';
import Image from './Image';
import ListView from './ListView';
import Group from './Group';
import FrameUtils from './FrameUtils';
import { registerLayerType } from './DrawingUtils';

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
  FrameUtils,
  registerLayerType,
};

module.exports = ReactCanvas;
