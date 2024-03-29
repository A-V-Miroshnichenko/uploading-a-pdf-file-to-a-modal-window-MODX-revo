# uploading-a-pdf-file-to-a-modal-window-MODX-revo
Загрузка pdf в модальное окно, для MODX Revo


1. В директорию /assets/components сохраните файл `get-modal-document.php`


2. В файле `modal-pdf.js` необходимый javascript код для работы с XMLHttpRequest


3. Создайте сниппет с названием `pdf`

	3.1. Содержимое сниппета pdf расположено в файле `snippet-pdf.php`


4. В файле `modal.html` находится разметка модального окна


5. В файле `style.css` находится стили модально окна. Остальные стили (container-xxl, d-flex, justify-content-between, align-items-center...) относятся к CSS-фреймворку bootstrap


6. Создайте в корне сайта директорию `doc` и загрузите в нее pdf-файл, например, file-name.pdf

	6.1. Если вы решите загружать файлы в другую директорию, то вам необходимо изменить путь в сниппете pdf `(...[[++site_url]]doc/...)`


7. На странице где необходимо разместить pdf файл, в поле Содержимое (он же `[[*content]]`) поместите созданный вами сниппет:
```html
[[pdf? &fileName =`file-name.pdf` &idDiv =`1`]]
```

где:

`&fileName` - это имя ПДФ файла на латинице, без пробелов. Например загруженный в директорию doc файл file-name.pdf
 
`&idDiv` - это порядковый номер файла (по умолчанию = 1). Если на странице больше одного pdf-файла, то необходимо указать следующие значения:

```html
[[pdf? &fileName =`file-name-1.pdf` &idDiv =`1`]]

[[pdf? &fileName =`file-name-2.pdf` &idDiv =`2`]]
.
.
.
[[pdf? &fileName =`file-name-n.pdf` &idDiv =`n`]]
```

Для вызова некэшируемого сниппета

```html
[[!pdf?
&fileName =`litsenziya-i-prilozheniya.pdf`
&idDiv =`1`
]]
```

Для вызова кэшируемого сниппета

```html
[[pdf?
&fileName =`litsenziya-i-prilozheniya.pdf`
&idDiv =`1`
]]
```

8. На странице где необходимо вызвать модальное окно с pdf-файлом разместите ссылку следующего вида:

```html
<a href="#" class="link-get-pdf" data-id="13" data-pdf="1" title="Просмотреть PDF">Просмотреть</a>
```

где:

`data-id` - это id ресурса (в админке указан справа от наименования ресурса) в котором размещен сниппет с нужным pdf-файлом, например, `page(13)`

`data-pdf` - это порядковый номер файла, размещенного, например в 13 ресурсе. Если на странице необходимо загрузить в модальное окно разные pdf-файлы, то ссылки необходимо размещать по аналогии:

```html
<a href="#" class="link-get-pdf" data-id="13" data-pdf="1" title="Просмотреть PDF">Просмотреть pdf c 13 ресурса 1 порядковый номер</a>

<a href="#" class="link-get-pdf" data-id="13" data-pdf="2" title="Просмотреть PDF">Просмотреть pdf c 13 ресурса 2 порядковый номер</a>
.
.
.
<a href="#" class="link-get-pdf" data-id="13" data-pdf="n" title="Просмотреть PDF">Просмотреть pdf c 13 ресурса n порядковый номер</a>
```
 
