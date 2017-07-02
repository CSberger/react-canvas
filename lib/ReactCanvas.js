'use strict';

import Surface from './Surface';
import Layer from './Layer';
import Image from './Image';
import ListView from './ListView';
import Group from './Group';
import Text from './Text';
import Gradient from './Gradient';
import FrameUtils from './FrameUtils';
import FontFace from './FontFace';
import { registerLayerType } from './DrawingUtils';

var ReactCanvas = {
  Surface,
  Layer,
  Group,
  Image,
  Text,
  ListView,
  Gradient,

  FontFace,
  measureText: require('./measureText'),
  createCanvasComponent: require('./createCanvasComponent'),
  FrameUtils,
  registerLayerType,
};

module.exports = ReactCanvas;
