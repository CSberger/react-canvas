import React from 'react';
import ReactDom from 'react-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ReactCanvas from '../lib/ReactCanvas'

const { registerLayerType, glUtils, createCanvasComponent, WebGlSurface } = ReactCanvas;

const { getShader }= glUtils;


const GL_type_sizes = {
    FLOAT: 4
};


registerLayerType('sphere', function (ctx, layer) {
    var x = layer.frame.x; 
    var y = layer.frame.y;
    var width = layer.frame.width * (window.devicePixelRatio || 1);
    var height = layer.frame.height * (window.devicePixelRatio || 1);


    const GL = ctx;

var shader_vertex_source="\n\
attribute vec2 position; //the position of the point\n\
attribute vec3 color;  //the color of the point\n\
\n\
varying vec3 vColor;\n\
void main(void) { //pre-built function\n\
gl_Position = vec4(position, 0., 1.); //0. is the z, and 1 is w\n\
vColor=color;\n\
}";


  var shader_fragment_source="\n\
precision mediump float;\n\
\n\
\n\
\n\
varying vec3 vColor;\n\
void main(void) {\n\
gl_FragColor = vec4(vColor, 1.);\n\
}";

  var shader_vertex=getShader(GL, shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");

  var shader_fragment=getShader(GL, shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");

  var SHADER_PROGRAM=GL.createProgram();
  GL.attachShader(SHADER_PROGRAM, shader_vertex);
  GL.attachShader(SHADER_PROGRAM, shader_fragment);

  GL.linkProgram(SHADER_PROGRAM);

  var _color = GL.getAttribLocation(SHADER_PROGRAM, "color");
  var _position = GL.getAttribLocation(SHADER_PROGRAM, "position");

  GL.enableVertexAttribArray(_color);
  GL.enableVertexAttribArray(_position);

  GL.useProgram(SHADER_PROGRAM);

   var triangle_vertex=[
    -1,-1, //first corner: -> bottom left of the viewport
    0,0,1,
    1,-1, //bottom right of the viewport
    1,1,0,
    0,1,  //top right of the viewport
    1,0,0
  ];

  var TRIANGLE_VERTEX= GL.createBuffer ();
  GL.bindBuffer(GL.ARRAY_BUFFER, TRIANGLE_VERTEX);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(triangle_vertex), GL.STATIC_DRAW);

  //FACES :
  var triangle_faces = [0,1,2];
  var TRIANGLE_FACES= GL.createBuffer();
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
  GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangle_faces), GL.STATIC_DRAW);

  // Set clear color to black, fully opaque
  GL.clearColor(0.0, 0.0, 0.0, 1.0);
  const animate = () => {
    console.log(`wxh ${width}x${height}`);
    GL.viewport(0.0, 0.0, width, height);
    GL.clear(GL.COLOR_BUFFER_BIT);

    GL.bindBuffer(GL.ARRAY_BUFFER, TRIANGLE_VERTEX);

    GL.vertexAttribPointer(_position, 2, GL.FLOAT, false, 4 * ( 2 + 3 ), 0);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 4 * ( 2 + 3 ), 2 * 4);

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
    GL.drawElements(GL.TRIANGLES, 3, GL.UNSIGNED_SHORT, 0);
    GL.flush();

    //window.requestAnimationFrame(animate);
  };
    window.requestAnimationFrame(animate);
  // Enable depth testing
  GL.enable(GL.DEPTH_TEST);
  // Near things obscure far things
  GL.depthFunc(GL.LEQUAL);
  // Clear the color as well as the depth buffer.
  GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
});

const Sphere = createCanvasComponent({
  displayName: 'Sphere',
  layerType: 'sphere',
  
  applyCustomProps: function (prevProps, props) {
    const style = props.style || {};
    const layer = this.node;
    layer.shadowColor = style.shadowColor || 0;
    layer.shadowOffsetX = style.shadowOffsetX || 0;
    layer.shadowOffsetY = style.shadowOffsetY || 0;
    layer.shadowBlur = style.shadowBlur || 0;
  }
});

var App = React.createClass({

  render: function () {
    return (
      <WebGlSurface
          top={10}
          left={10}
          width={500}
          height={500}
          contextType={'webgl'}
      >
          <Sphere
              background={'blue'}
              style={{
                  top: 10,
                  left: 10,
                  width: 500,
                  height: 500,
                  backgroundColor: 'green',
                  borderColor: '#000',
                  borderWidth: 1,
                  shadowColor: '#999',
                  shadowOffsetX: 15,
                  shadowOffsetY: 15,
                  shadowBlur: 20,
              }}
          />
      </WebGlSurface>
    );
  },
});


storiesOf('WebGl', module)
    .add('red-sphere', () => {
        const props = {size: {width: 80, height: 80}};
        return (
            <div>
                <App />
            </div>
        );
    });
