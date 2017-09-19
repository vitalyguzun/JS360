# JS360

>Note. English version of docs is coming soon...
### [See Demo](http://greenmars-components.surge.sh)

Компонент, имитирующий работу 3D модели с помощью массива закодированных в base64 изображений на входе и канваса на выходе.

## Оглавление

* [Входящие данные](#Входящие-данные-rest-output)
* [Быстрый старт](#Быстрый-старт)
* [Возможности](#Возможности)
* [API](#api)
  * [Methods](#methods)
    * [load](#loadindex)
    * [play](#playindex)
    * [stop](#stopindex)
    * [toggle](#toggleindex)
  * [Events](#events)
    * [onLoad](#onload)
    * [onRotateStart](#onrotatestart)
    * [onRotate](#onrotate)
    * [onRotateEnd](#onrotateend)
    * [onPlayStart](#onautoplaystart)
    * [onPlay](#onplay)
    * [onPlayEnd](#onplayend)
  * [Flags](#flags)
    * [isLoaded](#isloaded)
    * [isPending](#ispending)
    * [isMoving](#ismoving)
    * [isStopped](#isstopped)
    * [isPlayed](#isplayed)
  * [Options](#options)
    * [autoPlay](#autoplay-data-auto-play)
    * [baseUrl](#baseurl--data-base-url)
    * [controls.load](#controls--load-)
    * [controls.play](#controls--play-)
    * [height](#height--data-height)
    * [loadEvents](#loadevents-data-load-events)
    * [preloader](#preloader-data-preloader)
    * [preview](#preview-data-preview)
    * [retinaUrl](#retinaurl-data-retina-url)
    * [rotateEvents](#rotateevents-data-rotate-events)
    * [speed](#speed-data-speed)
    * [target](#target)
    * [url](#url-data-url)
    * [width](#width--data-width)


### Входящие данные (REST output)

```json
[
  "data:image/jpeg;base64,/9j/4AA...",
  "data:image/jpeg;base64,/9j/4Af...",
  "data:image/jpeg;base64,/9j/3sf...",
  "data:image/jpeg;base64,/9j/1gf..."
]
```

## Быстрый старт

1. Установка

```c
npm install --save js360
yarn add js360
```

2. Создаем контейнер, в который будет добавлен канвас.

```html
<div class="simple-js360"></div>
```

3. Канвас и изображение, добавляемое в него, получат размеры добавленного выше контейнера. Поэтому, у контейнера должны быть заданы минимальные стили.

```css
.simple-js360 {
  width: 320px;
  height: 180px;
}
```

4. Создаем объект модели и рендерим.

```js
import { JS360 } from 'js360';

const js360 = new JS360({ // options
  baseUrl: 'http://myrest', // без замыкающего слеша (проверки пока нет, но будет)
  target:  '.simple-js360',
  preview: '.assets/product.jpeg',
  url:     'product.json'
});

js360.render();
```

* `baseUrl` - базовый `url` к массиву изображений
* `target` - селектор `css` - контейнер, куда будет добавлен канвас
* `preview` - изображение для предпоказа. Пока целевой массив закодированных изображений еще не получен или загрузка не активирована
* `url` - путь до самого файла на сервере
* В итоге файл будет скачан по пути `http://myrest/product.json`

Мы получим контейнер, с шириной `320px` и высотой `180px`. В контейнере будет содержаться канвас, в котором будет рендериться изображение.
При клике на канвас произойдет запрос на сервер по адресу `http://myrest/product.json`.

>Note. Запрос пока простейший на `XMLHttpRequest`. Хедеры не поддерживает, но будет.

## Возможности

* Добавить канвас можно как на 1 компонент, так и на массив
* Кастомные события для загрузки и прокрутки контента
* Для `retina` можно загружать отдельный массив изображений. К примеру, если `window.devicePixelRatio === 2` загружаем изображения `720×480`, в ином случае `320x180`
* Скорость прокрутки
* Автопросмотр после загрузки
* Возможность включить и выключить кнопки управления (загрузка / остановка / ускорение)
* Много чего в планах, разработка ведется

# API

# Methods

* ## load([index])
type: **([index]) => Promise.all**

Ручная загрузка массива изображений. На вход метод получает массив индексов, определяющий для каких именно кансасов нужно выгрузить изображения. Если не передано ничего, изображения загружаются для всех кансасов объекта.
Возвращает промис, который резолвится, когда все запрошенные массивы получены.

```js
const js360 = new JS360({
  baseUrl: 'http://my_rest',
  target:  document.querySelectorAll('.js360')
});

js360.render();
js360.load().then(() => {
    // some code ...
    js360.play();
});
```

* ## play([index])
type: **[index]**

Ручной запуск автопросмотра. Метод получает на вход массив индексов, определяющий для каких именно кансасов нужно запустить просмотр. Если не передано ничего, просмотр запускается для всех кансасов объекта.

```js
const js360 = new JS360({
  baseUrl: 'http://my_rest',
  target:  document.querySelectorAll('.js360')
});

js360.render();
js360.load().then(() => {
    // some code ...
    js360.play();
});
```

* ## stop([index])
type: **[index]**

Ручная остановка автопросмотра. Метод получает на вход массив индексов, определяющий для каких именно кансасов нужно остановить просмотр. Если не передано ничего, просмотр останавливается для всех кансасов объекта.

```js
const js360 = new JS360({
  baseUrl: 'http://my_rest',
  target:  document.querySelectorAll('.js360'),
  autoPlay: true
});

js360.render();

setTimeout(() => {
    js360.stop([3]);
}, 2000);
```

Через 2 секунды после инициализации, просмотр будет остановлен для канваса с индексом 3.

* ## toggle([index])
type: **[index]**

Переключение режимов play / stop. Также получает на вход массив индексов, к которым нужно применить метод. Если ничего не передано - метод будет передан для всех канвасов данного объекта.

```js
const js360 = new JS360({
  baseUrl: 'http://my_rest',
  target:  document.querySelectorAll('.js360'),
  autoPlay: true
});

js360.render();

setTimeout(() => {
    js360.toggle();

    setTimeout(() => {
        js360.toggle();
    }, 2000);
}, 2000);
```

Через 2 секунды после инициализации, просмотр будет остановлен для всех канвасов. И будет запущен новый таймер на 2 секунды, для возобновления автопросмотра.

# Events

* ## onLoad
type: **function**

Вызывается после удачной загрузки изображений.

```js
const js360 = new JS360({
  baseUrl: 'http://my_rest',
  target:  document.querySelectorAll('.js360'),
  onLoad: () => console.log('images is loaded')
});

js360.render();
```

Успешная загрузка контента вызовет функцию `onLoad`.

* ## onRotateStart
type: **function**

```js
const js360 = new JS360({
  target:  document.querySelectorAll('.js360'),
  onRotateStart: () => console.log('rotate is started')
});

js360.render();
```

Активация прокрутки мышью вызовет функцию `onRotateStart`.

* ## onRotate
type: **function**

```js
const js360 = new JS360({
  target:  document.querySelectorAll('.js360'),
  onRotate: () => console.log('rotating happens now')
});

js360.render();
```

Каждый поворот модели вызовет функцию `onRotate`.

* ## onRotateEnd
type: **function**

```js
const js360 = new JS360({
  target:  document.querySelectorAll('.js360'),
  onRotateEnd: () => console.log('rotating is finished')
});

js360.render();
```

По завершению поворота модели будет вызвано событие `onRotateEnd`.

* ## onPlayStart
type: **function**

```js
const js360 = new JS360({
  target:  document.querySelectorAll('.js360'),
  onPlayStart: () => console.log('autoPlay is started')
});

js360.render();
```

Активация автопросмотра вызовет функцию `onPlayStart`.

* ## onPlay
type: **function**

```js
const js360 = new JS360({
  target:  document.querySelectorAll('.js360'),
  onPlay: () => console.log('autoPlay is happening now')
});

js360.render();
```

Каждая атоматическая смена изображения в канвасе активирует функцию `onPlay`.

* ## onPlayEnd
type: **function**

```js
const js360 = new JS360({
  target:  document.querySelectorAll('.js360'),
  onPlayEnd: () => console.log('autoPlay is finished')
});

js360.render();
```

Остановка автопросмотра вызывает событие `onPlayEnd`.

# Flags

* ## isLoaded
type: **function => boolean**

```js
const js360 = new JS360({ target:  document.querySelectorAll('.js360') });

js360.render();
js360.isLoaded();
```

`false` - изображения не загружены  
`true` - изображения загружены


* ## isPending
type: **function**

```js
const js360 = new JS360({ target:  document.querySelectorAll('.js360') });

js360.render();
js360.isPending();
```

`false` - изображения не загружаются в данный момент  
`true` - изображения загружаются в данный момент


* ## isMoving
type: **function => boolean**

```js
const js360 = new JS360({ target:  document.querySelectorAll('.js360') });

js360.render();
js360.isMoving();
```

`false` - ручной разворот подели не происходит  
`true` - происходит ручной поворот модели

* ## isStopped
type: **function => boolean**

```js
const js360 = new JS360({ target:  document.querySelectorAll('.js360') });

js360.render();
js360.isStopped();
```

`false` - автопросмотр включен  
`true` - автопросмотр выключен

* ## isPlayed
type: **function => boolean**

```js
const js360 = new JS360({ target:  document.querySelectorAll('.js360') });

js360.render();
js360.isPlayed();
```

`false` - автопросмотр выключен  
`true` - автопросмотр включен

# Options

Настраивать компонент можно с помощью свойств объекта `options`, передаваемого в конструктор `new JS360(options)` или через `data` атрибуты в html шаблоне.
Объект `options` при этом приоритетнее, и при одинаковых свойствах перезапишет данные переданные через `data` атрибуты.

* ## autoPlay	|| data-auto-play
type: **boolean**  
обязательное: **нет**  
по-умолчанию: **undefined**

Запускает автоматическую прокрутку изображений после их загрузки.

```js
const js360 = new JS360({
  baseUrl: 'http://my_rest',
  target:  '.js360',
  url:     'product.json',
  autoPlay: true
});

js360.render();
```

* ## baseUrl || data-base-url
type: **string**  
обязательное: **да**

Определяет левую часть `url`, по которому будет запрошен массив изображений.

```html
<div class="js360" data-base-url="http://my_first_rest" data-url="product.json"></div>
```

```js
const js360 = new JS360({
  baseUrl: 'http://my_second_rest',
  target:  '.js360'
});

js360.render();
```

При одновременном указании `baseUrl && data-base-url` приоритет будет у `baseUrl`.  
Массив закодированных изображений будет получен по адресу `http://my_second_rest/product.json`.

* ## controls: { load }
type: **boolean**  
обязательное: **нет**

Определяет кнопку управления загрузкой, которая перехватит на себя событие loadEvent (`mousemove` по-умолчанию).  
Если не определена - загрузка активируется через контейнер.  
Для корректной отрисовки, необходимо подключить `style.css`.

```js
import 'js360/style.css';

const js360 = new JS360({
  baseUrl: 'http://my_rest',
  target:  '.js360',
  url:     'product.json',
  controls: {
    load: true
  }
});

js360.render();
```

* ## controls: { play }
type: **boolean**  
обязательное: **нет**

Создает кнопку управления (старт / пауза) автоматическим просмотром.
Для корректной отрисовки, необходимо подключить `style.css`.

```js
import 'js360/style.css';

const js360 = new JS360({
  baseUrl: 'http://my_rest',
  target:  '.js360',
  url:     'product.json',
  controls: {
    play: true
  }
});

js360.render();
```

* ## height || data-height
type: **integer**  
обязательное: **нет**  
по-умолчанию: **container.clientHeight || 180**

Если задан - определяет высоту контейнера, которая наследуется в канвас и изображение.

* ## loadEvents	|| data-load-events
type: **array, stringified array**  
обязательное: **нет**  
по-умолчанию: **`['mousemove']`**

По-умолчанию, загрузка изображений происходит на событие `mousedown`. Это поведение можно изменить следующим образом.

```js
const js360 = new JS360({
  baseUrl: 'http://my_rest',
  target:  '.js360',
  url:     'product.json',
  loadEvents: ['mousedown', 'touchstart']
});

js360.render();
```

Теперь загрузка изображений активируется на события `['mousedown', 'touchstart']`.

* ## preloader || data-preloader
type: **boolean**
обязательное: **нет**
по-умолчанию: **undefined**

Если `true` - в момент начала загрузки изображений в контейнер будет добавлен прелоадер.
**Note:** Чтобы прелоадер корректно отрисовался, необходимо добавить файл `styles.css` из папки компонента.

```js
import 'js360/styles.css';

const js360 = new JS360({
  baseUrl: 'http://my_rest',
  target:  '.js360',
  url:     'product.json',
  preloader: true
});

js360.render();
```

* ## preview	|| data-preview
type: **string**  
обязательное: **нет**

Определяет изображение для предпоказа модели, пока основной конент еще не загружен или загрузка не инициирована.  
Свойство не обязательное, но следует иметь ввиду, если изображение для предпоказа не определено, после инициализации компонента, он будет пустым белым прямоугольником.

```js
const js360 = new JS360({
  baseUrl: 'http://my_rest',
  target:  '.js360',
  preview: '.assets/product.jpeg'
});

js360.render();
```

* ## retinaUrl	|| data-retina-url
type: **string**  
обязательное: **нет**

Определяет правую часть `url` строки, по которой будет получен массив изображений при следующих условиях:
* `window.devicePixelRatio === 2`
* заданы параметры `retinaUrl || data-retina-url`

```js
const js360 = new JS360({
  baseUrl:   'http://my_rest',
  target:    '.js360',
  url:       'product.json',
  retinaUrl: 'retina-product.json'
});

js360.render();
```

Для устройств `devicePixelRatio` которых отличается от 2 изображения будут получены по адресу `http://my_rest/product.json`.  
Для ретина экранов изображения будут получены по адресу `http://my_rest/retina-product.json`.


* ## rotateEvents	|| data-rotate-events
type: **array, stringified array**  
обязательное: **нет**  
по-умолчанию: **`['mousedown']`**

По-умолчанию, прокрутка изображений происходит на событие `mousedown`. Это поведение можно изменить следующим образом.

```html
<div class="js360" data-rotate-events='["mousemove"]'></div>
```

```js
const js360 = new JS360({
  baseUrl: 'http://my_rest',
  target:  '.js360',
  url:     'product.json'
});

js360.render();
```

Теперь прокрутка изображений активируется на событие `mousemove`.

* ## speed	|| data-speed
type: **integer, float (округляется до 2х цифр после запятой)**  
обязательное: **нет**  
по-умолчанию: **1**

По-умолчанию, все фотографии распределяются по ширине канваса. То есть, если зацепить канвас с левой стороны мышью и дотянуть до его правой стороны, пройдет 1 круг всех изображений.  
Это можно изменить, например, так.


```js
const js360Slow = new JS360({
  baseUrl: 'http://my_rest',
  target:  '.js360',
  url:     'product.json',
  speed: 0.5
});

const js360Fast = new JS360({
  baseUrl: 'http://my_rest',
  target:  '.js360',
  url:     'product.json',
  speed: 2
});

js360Slow.render(); // за 1 полную ширину канваса будут прокручены половина всех изображений
js360Fast.render(); // за 1 полную ширину канваса все изображения будут прокручены 2 раза
```

* ## target
type: **string, NodeElement, NodeList**  
обязательное: **да**

Определяет контейнеры, в которые будут добавлены канвасы.  
Передавать можно `css selector`, `NodeElement` или `NodeElement`

```js
const targetSelector = '.js360';
const targetNodeList = document.querySelectorAll('.js360');
const targetNodeElement = document.querySelector('.js360');

const js360 = new JS360({
  baseUrl: 'http://my_second_rest',
  target:  targetSelector || targetNodeList || targetNodeElement
});

js360.render();
```

* ## url	|| data-url
type: **string**  
обязательное: **да**

Определяет правую часть `url` строки, по которой будет получен массив изображений.

```js
const js360 = new JS360({
  baseUrl: 'http://my_rest',
  target:  '.js360',
  url:     'product.json'
});

js360.render();
```

Изображения будут получены по адресу `http://my_rest/product.json`.

* ## width || data-width
type: **integer**  
обязательное: **нет**  
по-умолчанию: **container.clientWidth || 320**

Если задан - определяет ширину контейнера, которая наследуется в канвас и изображение.
