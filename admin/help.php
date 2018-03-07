<?php
defined('STEREOZOOM_PATH') or die('Hacking attempt!');

// +-----------------------------------------------------------------------+
// | Help tab                                                              |
// +-----------------------------------------------------------------------+

// send variables to template
$template->assign(array(
  'stereoZoom' => $conf['stereoZoom'],
  'HELP_CONTENT' => load_language('help.html', STEREOZOOM_PATH, array('return'=>true)),
  ));

// define template file
$template->set_filename('stereoZoom_content', realpath(STEREOZOOM_PATH . 'admin/template/help.tpl'));
