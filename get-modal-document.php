<?php
if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
    
    define('MODX_API_MODE', true);
    require_once $_SERVER['DOCUMENT_ROOT'] . '/index.php';
    
    $modx->getService('error','error.modError');
    $modx->getRequest();
    $modx->setLogLevel(modX::LOG_LEVEL_ERROR);
    $modx->setLogTarget('FILE');
    $modx->error->message = null;
    
    $output = '';
    
    if ($_POST['dataid']) {

            $dataId = $_POST['dataid'];

            $object = $modx->getObject('modResource', $dataId);
            $content = $object->get('content');
            $pagetitle = $object->get('pagetitle');
    
            $maxIterations = (integer) $modx->getOption('parser_max_iterations', null, 10);
            $modx->getParser()->processElementTags('', $content, false, false, '[[', ']]', array(), $maxIterations);
            $modx->getParser()->processElementTags('', $content, true, true, '[[', ']]', array(), $maxIterations);
            
            $output = ['content' => $content, 'pagetitle' => $pagetitle];
    
    };
    
    @session_write_close();
    exit(json_encode($output));
    
};