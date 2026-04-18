// Copyright (c) 2021 8th Wall, Inc. — адаптовано для шкільного проєкту Олесі
/* globals AFRAME */

// Компонент, який «висаджує» квітку там, де ти тапаєш
AFRAME.registerComponent('tap-place', {
  init() {
    const ground = document.getElementById('ground')
    ground.addEventListener('click', (event) => {
      // Створюємо нову квітку
      const newElement = document.createElement('a-entity')

      // Точка, куди ти тапнув (з raycaster)
      const touchPoint = event.detail.intersection.point
      newElement.setAttribute('position', touchPoint)

      // Випадковий поворот, щоб квіти виглядали природно
      const randomYRotation = Math.random() * 360
      newElement.setAttribute('rotation', `0 ${randomYRotation} 0`)

      // Спочатку маленька і невидима
      newElement.setAttribute('visible', 'false')
      newElement.setAttribute('scale', '0.0001 0.0001 0.0001')

      // Тінь (щоб реалістично)
      newElement.setAttribute('shadow', { receive: false })

      // Завантажуємо модель КВІТКИ (замість дерева)
      newElement.setAttribute('gltf-model', '#flowerModel')

      // Додаємо в сцену
      this.el.sceneEl.appendChild(newElement)

      // Коли модель завантажилася — анімація росту
      newElement.addEventListener('model-loaded', () => {
        newElement.setAttribute('visible', 'true')
        newElement.setAttribute('animation', {
          property: 'scale',
          to: '0.8 0.8 0.8',        // розмір квітки (можна підкоригувати)
          easing: 'easeOutElastic',
          dur: 1200                  // 1.2 секунди
        })
      })
    })
  }
})
