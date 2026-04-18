/* globals AFRAME */

AFRAME.registerComponent('tap-place', {
  init() {
    const ground = document.getElementById('ground');
    
    if (!ground) {
      console.error('❌ Ground element not found!');
      return;
    }

    ground.addEventListener('click', (event) => {
      if (!event.detail?.intersection) return;

      const point = event.detail.intersection.point;

      const newFlower = document.createElement('a-entity');

      // Головне виправлення висоти — опускаємо квітку
      newFlower.setAttribute('position', `${point.x} ${point.y - 0.45} ${point.z}`);

      const rotY = Math.random() * 360;
      newFlower.setAttribute('rotation', `0 ${rotY} 0`);

      newFlower.setAttribute('scale', '0.01 0.01 0.01');
      newFlower.setAttribute('visible', 'false');

      newFlower.setAttribute('gltf-model', '#flowerModel');

      this.el.sceneEl.appendChild(newFlower);

      newFlower.addEventListener('model-loaded', () => {
        newFlower.setAttribute('visible', 'true');
        newFlower.setAttribute('animation', {
          property: 'scale',
          to: '0.72 0.72 0.72',
          easing: 'easeOutElastic',
          dur: 1450
        });
      });

      console.log(`🌸 Квітка посаджена | Y = ${point.y.toFixed(2)}`);
    });
  }
});
