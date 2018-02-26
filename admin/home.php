<?php
defined('STEREOZOOM_PATH') or die('Hacking attempt!');

// +-----------------------------------------------------------------------+
// | Home tab                                                              |
// +-----------------------------------------------------------------------+

// send variables to template
$template->assign(array(
  'stereoZoom' => $conf['stereoZoom'],
  'INTRO_CONTENT' => load_language('intro.html', STEREOZOOM_PATH, array('return'=>true)),
  ));

// define template file
$template->set_filename('stereoZoom_content', realpath(STEREOZOOM_PATH . 'admin/template/home.tpl'));
