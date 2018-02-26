<?php
defined('STEREOZOOM_PATH') or die('Hacking attempt!');

/**
 * admin plugins menu link
 */
function stereoZoom_get_admin_plugin_menu_links($menu)
{
  $menu[] = array(
    'NAME' => l10n('StereoZoom'),
    'URL' => STEREOZOOM_ADMIN,
    );

  return $menu;
}

