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

// render_element_content 	trigger_change 	string $content, array $current_picture 	picture.php 
function stereoZoom_render_element_content($content, $picture)
{
    global $conf, $page, $template;

    if ( isset($page['slideshow']) and $page['slideshow'] ) {
        return $content;
    }
// 	if ( !preg_match ( '/.*_dg\.jpg$/i', $picture['file'] ) ) {
    if ( !preg_match ( sprintf(STEREOZOOM_REGEXP_DETECT, $conf['stereoZoom']['suffix']), $picture['file'] ) ) {
        return $content;
    }
// 	echo printf('<pre>%s</pre>', var_export($picture, true));
    
    // derivative_default_size
    $deriv_type = pwg_get_session_var('picture_deriv', $conf['derivative_default_size']);
    $selected_derivative = $picture['derivatives'][$deriv_type];
    
    $template->append('current', array(
        'selected_derivative' => $selected_derivative,
    ), true);
    
    $template->set_filename( 'stereoZoom_picture', STEREOZOOM_PATH . 'template/picture_sz100.tpl' );

    $template->assign( array(
        'STEREOZOOM_PATH' => STEREOZOOM_PATH,
        'STEREOZOOM_IMG_PATH' => $picture['path'],
        'stereoZoom' => $conf['stereoZoom'],
        'pictureId' => $picture['id'],
// 		'STEREOZOOM_IMG_REL_PATH' => $picture['derivatives']['medium']->rel_path,
        'STEREOZOOM_IMG_INFO' => var_export($content, true),
    ) );
    
    return $template->parse( 'stereoZoom_picture', true );
}


// Section init
function stereoZoom_section_init_additional_page()
{
    global $tokens ;

    if (($tokens[0] == 'sz' and !empty($tokens[1])))
        include(STEREOZOOM_PATH . 'additional_page.php');

}
