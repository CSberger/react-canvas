import { getDrawFunction, registerLayerType } from './DrawingUtils';

export const getShader = (ctx, source, type, typeString) => {
    var shader = ctx.createShader(type);
    ctx.shaderSource(shader, source);
    ctx.compileShader(shader);
    if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
      console.error("ERROR IN "+typeString+ " SHADER : " + ctx.getShaderInfoLog(shader));
      return false;
    }
    return shader;
  };

/**
 * @private
 */
function sortByZIndexAscending (layerA, layerB) {
  return (layerA.zIndex || 0) - (layerB.zIndex || 0);
}

/**
 * Draw a RenderLayer instance to a <canvas> context.
 *
 * @param {CanvasRenderingContextWebGl} ctx
 * @param {RenderLayer} layer
 */
export function drawRenderLayer (ctx, layer) {
  var drawFunction = getDrawFunction(layer.type);

  // Performance: avoid drawing hidden layers.
  if (typeof layer.alpha === 'number' && layer.alpha <= 0) {
    return;
  }


  // Establish drawing context for certain properties:
  // - alpha
  // - translate
  var saveContext = (layer.alpha !== null && layer.alpha < 1) ||
                    (layer.translateX || layer.translateY);

  if (saveContext) {
//    ctx.save();

    // Alpha:
    if (layer.alpha !== null && layer.alpha < 1) {
      ctx.globalAlpha = layer.alpha;
    }

    // Translation:
    if (layer.translateX || layer.translateY) {
//      ctx.translate(layer.translateX || 0, layer.translateY || 0);
    }
  }

  // If the layer is bitmap-cacheable, draw in a pooled off-screen canvas.
  // We disable backing stores on pad since we flip there.
  if (layer.backingStoreId) {
  //  drawCacheableRenderLayer(ctx, layer, drawFunction);
  } else {
    // Draw layer
//    ctx.save();
    drawFunction && drawFunction(ctx, layer);
//    ctx.restore();

    // Draw child layers, sorted by their z-index.
    if (layer.children) {
      layer.children.slice().sort(sortByZIndexAscending).forEach(function (childLayer) {
        drawRenderLayer(ctx, childLayer);
      });
    }
  }

  // Pop the context state if we established a new drawing context.
  if (saveContext) {
    ctx.restore();
  }
}