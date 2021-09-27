{* <!-- load CSS files --> *}
{combine_css id="skeleton" path=$STEREOZOOM_PATH|cat:"template/picture_sz100.css"}

{* <!-- load JS files --> *}
{combine_script id="skeleton" path=$STEREOZOOM_PATH|cat:"template/picture_sz100.js"}


<pre style="text-align:left; display:none;">
{var_export($pictureId, true)}
</pre>
<ul id="sz100tools">
<li><a href="#" id="toggleView" title="{'Switch right and left views&#013;[X] key'|translate}" >X</a></li>
<li><a href="#" id="toggleDA" title="{'Move: both views are displaced with the mouse&#013;Adjust: a single view is displaced with the mouse&#013;[Ctrl] key + mouse'|translate}" >Ctrl</a></li>
<li><a href="#" id="toggleZoom" title="{'Zoom 100% / Zoom Fit&#013;[Z] key'|translate}" >Z</a>
      <a href="#" id="buttonZoomIn" title="{'Zoom +&#013;[+] key'|translate}" > + </a> <a href="#" id="buttonZoomOut" title="{'Zoom −&#013;[−] key'|translate}" > − </a></li>
<li><a href="#" id="reset" title="{'Reset&#013;[R] key'|translate}" > R </a>
      <a href="#" id="toggleFullscreen" title="{'Full screen&#013;[F] key'|translate}" > F </a>
      <a href="#" id="toggleFullwindow" title="{'Full window&#013;[W] key'|translate}" > W </a></li>
      <a href="#" id="toggleHelp" title="{'Help&#013;[?] key'|translate}" > ? </a></li>
</ul>

	<div id="szDisplay"></div>
	
	<div id="szHidden"><div id="lunettes"><div id="yeux"><canvas id="vue_droite" title="{'double click : previous'|translate}" ></canvas><canvas id="vue_gauche" title="{'double click : next'|translate}"></canvas></div></div><div id="z_yeux"><div id="z_vue_droite" title="{'drag : move&#013;double click : previous'|translate}" ></div><div id="z_vue_gauche" title="{'drag : move&#013;double click : next'|translate}" ></div></div></div>
	
<script type="text/javascript">
var pictureId={$pictureId};
var imgDerivPath='{$current.selected_derivative->get_url()}';
var imgOrigPath='{$STEREOZOOM_IMG_PATH}';
var isForCrossView={$stereoZoom.isForCrossView}; 
var zCteWheel={$stereoZoom.zCteWheel}; 
var langCrossView='{'Cross view'|translate}';
var langParallelView='{'Parallel view'|translate}';
var langMoveBoth='{'Move'|translate}';
var langMoveAdjust='{'Adjust'|translate}';
var langZoomFit='{'Z Fit'|translate}';
var langZoom100='{'Z 100%'|translate}';
var langWait='{'Please wait'|translate}';
</script>


