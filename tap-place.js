/* globals AFRAME */

AFRAME.registerComponent('tap-place', {
  init() {
    const ground = document.getElementById('ground');
    
    if (!ground) {
      console.error('Ground element not found!');
      return;
    }

    ground.addEventListener('click', (event) => {
      if (!event.detail || !event.detail.intersection) return;

      const touchPoint = event.detail.intersection.point;

      const newFlower = document.createElement('a-entity');
      
      // Головне виправлення: трохи опускаємо квітку + додаємо невеликий offset
      // Спробуй значення від -0.3 до -1.0 залежно від твоєї моделі
      newFlower.setAttribute('position', `${touchPoint.x} ${touchPoint.y - 0.4} ${touchPoint.z}`);
      
      // Випадковий поворот
      const rotY = Math.random() * 360;
      newFlower.setAttribute('rotation', `0 ${rotY} 0`);
      
      // Початковий розмір
      newFlower.setAttribute('scale', '0.01 0.01 0.01');
      newFlower.setAttribute('visible', 'false');
      
      newFlower.setAttribute('gltf-model', '#flowerModel');
      
      this.el.sceneEl.appendChild(newFlower);

      newFlower.addEventListener('model-loaded', () => {
        newFlower.setAttribute('visible', 'true');
        newFlower.setAttribute('animation', {
          property: 'scale',
          to: '0.75 0.75 0.75',
          easing: 'easeOutElastic',
          dur: 1400
        });
      });

      console.log('🌸 Квітка посаджена. Y =', touchPoint.y);
    });
  }
});
