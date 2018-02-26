{* <!-- load CSS files --> *}
{combine_css id="skeleton" path=$STEREOZOOM_PATH|cat:"template/picture_sz100.css"}

{* <!-- load JS files --> *}
{combine_script id="skeleton" path=$STEREOZOOM_PATH|cat:"template/picture_sz100.js"}

<pre style="text-aagn:left; display:none;">
{$STEREOZOOM_IMG_INFO}
</pre>

<ul id="sz100tools">
<li><a href="#" id="toggleZoom" title="{'Zoom 100% / Zoom Fit&#013;[Z] key'|translate}" >Z</a></li>
<li><a href="#" id="toggleFullscreen" title="{'Full screen&#013;[F] key'|translate}" >F</a></li>
<li><a href="#" id="toggleLP" title="{'Switch right and left views&#013;[X] key'|translate}" >X</a></li>
<li><a href="#" id="toggleDA" title="{'Déplacement : both views are displaced with the mouse&#013;Ajustement : a single view is displaced with the mouse&#013;[Ctrl] key + mouse'|translate}" >Ctrl</a></li>
</ul>

	<div id="lunettes"><div id="yeux"><canvas id="vue_droite" title="{'click : previous'|translate}" ></canvas><canvas id="vue_gauche" title="{'click : next'|translate}"></canvas></div></div>
<input id="imgrelpath" type="hidden" value="{$current.selected_derivative->get_url()}" />
	
	<div id="zoom"><div id="z_yeux"><div id="z_vue_droite" title="{'drag : move&#013;double click : previous'|translate}" ></div><div id="z_vue_gauche" title="{'drag : move&#013;double click : next'|translate}" ></div></div></div>
<input id="imgpath" type="hidden" value="{$STEREOZOOM_IMG_PATH}" />


