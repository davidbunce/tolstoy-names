<?php
function tolstoynames_frontend_resources()
{
    wp_enqueue_script( 'main_js', get_template_directory_uri() . '/dist/js/tolstoy-names.min.js', array('jquery'), '', true);

    wp_enqueue_style('main_css', get_template_directory_uri() . '/dist/css/main.css', false, null);
}


add_action( 'wp_enqueue_scripts', 'tolstoynames_frontend_resources' );