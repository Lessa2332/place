/* globals AFRAME */

AFRAME.registerComponent('tap-place', {
  init() {
    const ground = document.getElementById('ground');
    
    if (!ground) {
      console.error('Ground element not found! Перевір id="ground" у index.html');
      return;
    }

    ground.addEventListener('click', (event) => {
      // Захист: якщо немає точки перетину — нічого не робити
      if (!event.detail || !event.detail.intersection) return;

      const newFlower = document.createElement('a-entity');
      
      const touchPoint = event.detail.intersection.point;
      newFlower.setAttribute('position', `${touchPoint.x} ${touchPoint.y + 0.05} ${touchPoint.z}`); // трохи піднімаємо, щоб не провалювалась у землю
      
      // Випадковий поворот для природності
      const rotY = Math.random() * 360;
      newFlower.setAttribute('rotation', `0 ${rotY} 0`);
      
      // Початковий дуже маленький розмір
      newFlower.setAttribute('scale', '0.01 0.01 0.01');
      newFlower.setAttribute('visible', 'false');
      
      // Модель квітки
      newFlower.setAttribute('gltf-model', '#flowerModel');
      
      // Додаємо в сцену
      this.el.sceneEl.appendChild(newFlower);

      // Анімація росту після завантаження моделі
      newFlower.addEventListener('model-loaded', () => {
        newFlower.setAttribute('visible', 'true');
        
        newFlower.setAttribute('animation', {
          property: 'scale',
          to: '0.75 0.75 0.75',     // можеш змінити на 0.6 або 0.9, якщо квітка надто велика/мала
          easing: 'easeOutElastic',
          dur: 1400,
          loop: false
        });
      });

      // Опціонально: лог для дебагу
      console.log('🌸 Квітка посаджена в точці:', touchPoint);
    });
  }
});
