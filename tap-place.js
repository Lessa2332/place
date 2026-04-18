/* globals AFRAME */

AFRAME.registerComponent('tap-place', {
  init() {
    const scene = this.el.sceneEl;

    scene.addEventListener('click', (event) => {
      if (!event.detail?.intersection) return;

      const point = event.detail.intersection.point;

      const newFlower = document.createElement('a-entity');

      // Опускаємо трохи нижче точки hit-test (найкращий компроміс)
      newFlower.setAttribute('position', `${point.x} ${point.y - 0.08} ${point.z}`);

      const rotY = Math.random() * 360;
      newFlower.setAttribute('rotation', `0 ${rotY} 0`);

      newFlower.setAttribute('scale', '0.02 0.02 0.02');
      newFlower.setAttribute('visible', 'false');

      newFlower.setAttribute('gltf-model', '#flowerModel');

      scene.appendChild(newFlower);

      newFlower.addEventListener('model-loaded', () => {
        newFlower.setAttribute('visible', 'true');
        newFlower.setAttribute('animation', {
          property: 'scale',
          to: '0.75 0.75 0.75',
          easing: 'easeOutElastic',
          dur: 1400
        });
      });

      console.log(`🌸 Квітка посаджена на Y = ${point.y.toFixed(3)}`);
    });
  }
});
