# JS360

### Demo (скоро будет много примеров)

Компонент, имитирующий работу 3D модели с помощью массива закодированных в base64 изображений на входе и канваса на выходе.

## Оглавление

* [Входящие данные](#Входящие-данные-rest-output)
* [Быстрый старт](#Быстрый-старт)
* [Возможности](#Возможности)
* [API (options)](#api-options)
  * [autoPlay](#autoplay-data-auto-play)
  * [baseUrl](#baseurl--data-base-url)
  * [controls.load](#controls--load-)
  * [controls.pause](#controls--pause-)
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

# API (options)

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

* ## controls: { pause }
type: **boolean**  
обязательное: **нет**

Создает кнопку управления (пауза / старт) автоматическим просмотром.
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
