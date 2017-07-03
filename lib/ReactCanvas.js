'use strict';

import Surface from './Surface';
import Layer from './Layer';
import Image from './Image';
import ListView from './ListView';
import Group from './Group';
import Text from './Text';
import Gradient from './Gradient';
import FrameUtils from './FrameUtils';
import createCanvasComponent from './createCanvasComponent';
import FontFace from './FontFace';
import measureText from './measureText';
import { registerLayerType } from './DrawingUtils';

const ReactCanvas = {
  Surface,
  Layer,
  Group,
  Image,
  Text,
  ListView,
  Gradient,

  FontFace,
  measureText,
  createCanvasComponent,
  FrameUtils,
  registerLayerType,
};
export default ReactCanvas;

module.exports = ReactCanvas;
