// Получим переменные для работы
const linkGetPdf = document.getElementsByClassName('link-get-pdf');
const modalInsertDocuments = document.querySelector('#modal-insert-documents');
const closeModalDocuments = document.querySelector('#close-modal-documents');
const documentTitle = document.querySelector('#documentTitle');
const documentBody = document.querySelector('#documentBody');

// Если количество ссылок больше нуля
if (linkGetPdf.length > 0) {
    let i;

    for (i = 0; i < linkGetPdf.length; i++) {
        linkGetPdf[i].addEventListener('click', function (e) {
            
             e.preventDefault();
            //  Получим необходимые data атрибуты
            
            // data-id - это id ресурса в котором опубликован pdf файл
            // <a href="#" class="link-get-pdf" data-id="16" data-pdf="1" title="Посмотреть PDF">Посмотреть PDF</a>
            let attributeDataId = e.currentTarget.getAttribute('data-id');
            // Поскольку на одной странице может распологаться больше одного pdf в атрибуте data-pdf указывается порядковый номер файла, получим его
            let attributeDataPdf = e.currentTarget.getAttribute('data-pdf');
            
            function getModalDoc() {
                    // Подготовим запрос на сервер
                    const formData = 'dataid=' + attributeDataId;
                    
                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', '/assets/components/get-modal-document.php');
                    xhr.responseType = 'json';
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.onload = () => {
                        if (xhr.status !== 200) {
                            return;
                        };
                        // Запищем массив ответа сервера в переменную response
                        const response = xhr.response;
                        
                        // Предварительно очистим содержимое полей (div) для вставки контента
                        documentBody.innerHTML = '';
                        documentTitle.innerHTML = '';
                        
                        if (typeof attributeDataPdf === 'undefined' ||  attributeDataPdf === null) {
                            // Если переменной attributeDataPdf не присвоено значение или переменная null
                            return documentBody.innerHTML = 'Запрашиваемая информация не найдена';
                            
                        } else {
                            // Если переменной attributeDataPdf присвоено значение или переменная не null
                            // Анализируем строку ответа response.content и запишем его в переменную doc в форматие HTMLDocument
                            let doc = new DOMParser().parseFromString(response.content, "text/html");
                            let dataPdf = 'doc' + attributeDataPdf;
                            // Отфильтруем полученный контент по css селектору (например, id="doc1" или id="doc2"...)
                            let insDoc = doc.getElementById(dataPdf);
                            
                            if (typeof insDoc === 'undefined' || insDoc === null) {
                                
                                return documentBody.innerHTML = 'Запрашиваемая информация не найдена';
                                
                            } else {
                                // Вставим полученный заголовок запрашиеваемого ресурса в <div id="documentTitle">
                                documentTitle.innerHTML = response.pagetitle;
                                // Вставим отфильтрованный контент в <div id="documentBody">
                                documentBody.innerHTML = insDoc.innerHTML;
                                // Откроем модальное окно
                                modalInsertDocuments.classList.add('modal-d-block');
                                
                            };
                            
                        };
                        
                    };
                    
                    xhr.send(formData);
                    
                };
            // Запустим функцию
            getModalDoc();
            
        });
    };
};

// Закрыть модальное окно
closeModalDocuments.addEventListener('click', function(e) {
    e.preventDefault();
    
    modalInsertDocuments.classList.remove('modal-d-block');
    // Очистить содержимое
    documentBody.innerHTML = '';
    documentTitle.innerHTML = '';
});