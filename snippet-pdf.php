<?php
$fileName = $modx->getOption('fileName', $scriptProperties, '');
$idDiv = $modx->getOption('idDiv', $scriptProperties, '1');

echo '<div id="doc' . $idDiv . '" class="wrap-div-pdf"><iframe src="[[++site_url]]doc/' . $fileName . '" class="iframe-pdf"></iframe><div class="div-a-pfd mt-4"><p class="mb-1">Ссылка на документ:</p><a href="[[++site_url]]doc/' . $fileName . '" target="_blank">[[++site_url]]doc/' . $fileName . '</a></div></div>';