<?php
/*
Plugin Name: stereoZoom
Version: 1.2.0
Description: Manage stereo RL pictures (Gestion des images stéréo DG)
Plugin URI: http://piwigo.org/ext/extension_view.php?eid=876
Author: TOnin
Author URI: https://github.com/7tonin
*/

/**
 * This is the main file of the plugin, called by Piwigo in "include/common.inc.php" line 137.
 * At this point of the code, Piwigo is not completely initialized, so nothing should be done directly
 * except define constants and event handlers (see http://piwigo.org/doc/doku.php?id=dev:plugins)
 */

defined('PHPWG_ROOT_PATH') or die('Hacking attempt!');


// +-----------------------------------------------------------------------+
// | Define plugin constants                                               |
// +-----------------------------------------------------------------------+
global $prefixeTable;

define('STEREOZOOM_ID',      basename(dirname(__FILE__)));
define('STEREOZOOM_PATH' ,   PHPWG_PLUGINS_PATH . STEREOZOOM_ID . '/');
define('STEREOZOOM_TABLE',   $prefixeTable . 'stereoZoom');
define('STEREOZOOM_ADMIN',   get_root_url() . 'admin.php?page=plugin-' . STEREOZOOM_ID);
define('STEREOZOOM_PUBLIC',  get_absolute_root_url() . make_index_url(array('section' => 'stereoZoom')) . '/');
define('STEREOZOOM_DIR',     PHPWG_ROOT_PATH . PWG_LOCAL_DIR . 'stereoZoom/');

define('STEREOZOOM_REGEXP_SUFFIX',     '/^(-|_)*[a-z0-9]{2,6}$/');
define('STEREOZOOM_REGEXP_DETECT',     '/%s\.jpg$/i');



// +-----------------------------------------------------------------------+
// | Add event handlers                                                    |
// +-----------------------------------------------------------------------+
// init the plugin
add_event_handler('init', 'stereoZoom_init');

/*
 * this is the common way to define event functions: create a new function for each event you want to handle
 */
if (defined('IN_ADMIN'))
{
	// file containing all admin handlers functions
	$admin_file = STEREOZOOM_PATH . 'include/admin_events.inc.php';
	
	// Hook on to an event to show the administration page.
	add_event_handler('get_admin_plugin_menu_links', 'stereoZoom_get_admin_plugin_menu_links',
    EVENT_HANDLER_PRIORITY_NEUTRAL, $admin_file);
}

// file containing all admin handlers functions
$alluser_file = STEREOZOOM_PATH . 'include/events.inc.php';

add_event_handler('render_element_content', 'stereoZoom_render_element_content', 
EVENT_HANDLER_PRIORITY_NEUTRAL, $alluser_file);

/**
 * plugin initialization
 *   - check for upgrades
 *   - unserialize configuration
 *   - load language
 */
function stereoZoom_init()
{
  global $conf;

  // load plugin language file
  load_language('plugin.lang', STEREOZOOM_PATH);

  // prepare plugin configuration
  $conf['stereoZoom'] = safe_unserialize($conf['stereoZoom']);
}
