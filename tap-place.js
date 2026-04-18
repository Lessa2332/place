/* globals AFRAME */

AFRAME.registerComponent('tap-place', {
  init() {
    const scene = this.el.sceneEl;

    // Слухаємо кліки по всій сцені (8th Wall передає точку зіткнення з реальною площиною)
    scene.addEventListener('click', (event) => {
      // Перевіряємо, чи є точка перетину (hit-test)
      if (!event.detail || !event.detail.intersection) return;

      const point = event.detail.intersection.point;

      // Обмеження максимальної кількості квітів (безпека продуктивності)
      const existingFlowers = document.querySelectorAll('.flower-planted');
      if (existingFlowers.length >= 35) {
        // Видаляємо найстарішу квітку
        existingFlowers[0].remove();
      }

      // Створюємо нову квітку
      const newFlower = document.createElement('a-entity');
      newFlower.classList.add('flower-planted');

      // Коригування висоти: опускаємо на 0.05–0.1 (залежить від моделі)
      // Це компроміс, щоб квітка «стояла» на площині, а не висіла
      const yOffset = -0.07;
      newFlower.setAttribute('position', `${point.x} ${point.y + yOffset} ${point.z}`);

      // Випадковий поворот
      const rotY = Math.random() * 360;
      newFlower.setAttribute('rotation', `0 ${rotY} 0`);

      // Починаємо з маленького масштабу (анімація появи)
      newFlower.setAttribute('scale', '0.02 0.02 0.02');
      newFlower.setAttribute('visible', 'false');

      // Завантажуємо модель
      newFlower.setAttribute('gltf-model', '#flowerModel');

      scene.appendChild(newFlower);

      // Після завантаження моделі – показуємо та запускаємо анімацію
      newFlower.addEventListener('model-loaded', () => {
        newFlower.setAttribute('visible', 'true');
        newFlower.setAttribute('animation', {
          property: 'scale',
          to: '0.75 0.75 0.75',
          easing: 'easeOutElastic',
          dur: 1400
        });
      });

      // Не відправляємо жодних даних на сервер, навіть логування мінімальне
      // console.log(`Квітка посаджена`); – прибираємо для чистоти, але можна залишити для налагодження
    });
  }
});
