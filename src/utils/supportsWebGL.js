export function supportsWebGL() {
  try {
    const test = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (test.getContext('webgl2') || test.getContext('webgl')));
  } catch {
    return false;
  }
}
