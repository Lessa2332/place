/* globals AFRAME */

AFRAME.registerComponent('tap-place', {
  init() {
    const scene = this.el.sceneEl;

    scene.addEventListener('click', (event) => {
      if (!event.detail || !event.detail.intersection) return;

      const point = event.detail.intersection.point;

      // Обмеження кількості квітів (35 максимум)
      const existingFlowers = document.querySelectorAll('.flower-planted');
      if (existingFlowers.length >= 35) {
        existingFlowers[0].remove();
      }

      const newFlower = document.createElement('a-entity');
      newFlower.classList.add('flower-planted');

      // Коригування висоти (залежить від моделі)
      const yOffset = -0.07;
      newFlower.setAttribute('position', `${point.x} ${point.y + yOffset} ${point.z}`);

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
    });
  }
});
