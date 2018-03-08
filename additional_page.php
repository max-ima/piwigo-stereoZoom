<?php

if (!defined('PHPWG_ROOT_PATH')) die('Hacking attempt!');

global $template, $user;

echo load_language('help.html', STEREOZOOM_PATH, array('return'=>true));
exit();
/*
// Page initilization
$page['section'] = 'additional_page';

$page['additional_page'] = array(
//   'id' => $row['id'],
//   'permalink' => @$row['permalink'],
  'title' => l10n('Help'),
  'content' => load_language('help.html', STEREOZOOM_PATH, array('return'=>true)),
);



add_event_handler('loc_end_index', 'ap_set_index');
add_event_handler('loc_begin_page_header', 'ap_set_header');

function ap_set_header()
{
  global $page, $title;
  
  if ($page['ap_homepage'])
  {
    $page['body_id'] = 'theHomePage';
  }
  else
  {
    $page['body_id'] = 'theAdditionalPage';
    $title = $page['additional_page']['title'];
  }
}

function ap_set_index()
{
  global $template, $page, $conf;

  if (is_admin())
  {
    $template->assign('U_EDIT', get_root_url().'admin.php?page=plugin-'.AP_DIR.'-edit_page&amp;edit='.$page['additional_page']['id'].'&amp;redirect=true');
  }

  $title = $page['additional_page']['title'];
  if ($conf['AP']['show_home'] and !$page['ap_homepage'])
  {
    $title = '<a href="'.get_gallery_home_url().'">'.l10n('Home').'</a>'.$conf['level_separator'].$title;
  }

  $template->assign(array(
    'TITLE' => $title,
    'PLUGIN_INDEX_CONTENT_BEGIN' => $page['additional_page']['content'],
    )
  );
  
  $template->clear_assign(array('U_MODE_POSTED', 'U_MODE_CREATED'));
}
*/

?>
