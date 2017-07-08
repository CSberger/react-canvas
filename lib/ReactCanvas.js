'use strict';

import Surface from './Surface';
import Layer from './Layer';
import Image from './Image';
import ListView from './ListView';
import Group from './Group';
import Text from './Text';
import Gradient from './Gradient';
import FrameUtils from './FrameUtils';
import WebGlSurface from './WebGlSurface';
import ThreeJSSurface from './ThreeJSSurface';
import createCanvasComponent from './createCanvasComponent';
import FontFace from './FontFace';
import measureText from './measureText';
import { registerLayerType } from './DrawingUtils';
import {getShader} from './WebGlDrawingUtils';

const ReactCanvas = {
    Surface,
    Layer,
    Group,
    Image,
    Text,
    ListView,
    Gradient,
    WebGlSurface,
    ThreeJSSurface,

    FontFace,
    measureText,
    createCanvasComponent,
    FrameUtils,
    registerLayerType,
    glUtils: {
        getShader,
    }
};

export default ReactCanvas;
