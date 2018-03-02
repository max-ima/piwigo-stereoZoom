<?php
/**
 * This is the main administration page, if you have only one admin page you can put
 * directly its code here or using the tabsheet system like bellow
 */

defined('STEREOZOOM_PATH') or die('Hacking attempt!');

global $template, $page, $conf;


// get current tab
$page['tab'] = isset($_GET['tab']) ? $_GET['tab'] : $page['tab'] = 'home';

// plugin tabsheet is not present on photo page
if ($page['tab'] != 'photo')
{
  // tabsheet
  include_once(PHPWG_ROOT_PATH.'admin/include/tabsheet.class.php');
  $tabsheet = new tabsheet();
  $tabsheet->set_id('stereoZoom');

  $tabsheet->add('home', l10n('Welcome'), STEREOZOOM_ADMIN . '-home');
  $tabsheet->add('help', l10n('Help'), STEREOZOOM_ADMIN . '-help');
  $tabsheet->add('config', l10n('Configuration'), STEREOZOOM_ADMIN . '-config');
  $tabsheet->select($page['tab']);
  $tabsheet->assign();
}

// include page
include(STEREOZOOM_PATH . 'admin/' . $page['tab'] . '.php');

// template vars
$template->assign(array(
  'STEREOZOOM_PATH'=> STEREOZOOM_PATH, // used for images, scripts, ... access
  'STEREOZOOM_ABS_PATH'=> realpath(STEREOZOOM_PATH), // used for template inclusion (Smarty needs a real path)
  'STEREOZOOM_ADMIN' => STEREOZOOM_ADMIN,
  ));

// send page content
$template->assign_var_from_handle('ADMIN_CONTENT', 'stereoZoom_content');
