<?php
defined('STEREOZOOM_PATH') or die('Hacking attempt!');

// +-----------------------------------------------------------------------+
// | Configuration tab                                                     |
// +-----------------------------------------------------------------------+

// save config
if (isset($_POST['save_config']))
{
	if(preg_match(STEREOZOOM_REGEXP_SUFFIX, $_POST['STEREOZOOMPLUGIN_VAR_SUFFIX'])) {
		$conf['stereoZoom']['suffix'] = $_POST['STEREOZOOMPLUGIN_VAR_SUFFIX'];
	}
	if(preg_match('/^(true|false)$/', $_POST['STEREOZOOMPLUGIN_VAR_ISFORCROSSVIEW'])) {
		$conf['stereoZoom']['isForCrossView'] = $_POST['STEREOZOOMPLUGIN_VAR_ISFORCROSSVIEW'];
	}
	if(is_numeric($_POST['STEREOZOOMPLUGIN_VAR_ZCTEWHEEL'])) {
		$conf['stereoZoom']['zCteWheel'] = 0+$_POST['STEREOZOOMPLUGIN_VAR_ZCTEWHEEL'];
	}

	conf_update_param('stereoZoom', $conf['stereoZoom']);
	$page['infos'][] = l10n('Information data registered in database');
}

// send config to template
$template->assign(array(
  'stereoZoom' => $conf['stereoZoom'],
  'stereoZoom_REGEXP_detect' => sprintf(STEREOZOOM_REGEXP_DETECT, $conf['stereoZoom']['suffix']),
  ));

// define template file
$template->set_filename('stereoZoom_content', realpath(STEREOZOOM_PATH . 'admin/template/config.tpl'));
