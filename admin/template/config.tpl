{combine_css path=$STEREOZOOM_PATH|@cat:"admin/template/style.css"}

{footer_script}
jQuery('input[name="option2"]').change(function() {
  $('.option1').toggle();
});

jQuery(".showInfo").tipTip({
  delay: 0,
  fadeIn: 200,
  fadeOut: 200,
  maxWidth: '300px',
  defaultPosition: 'bottom'
});
{/footer_script}


<div class="titrePage">
	<h2>{'StereoZoom'|translate}</h2>
</div>

<div style="margin:1em; padding:1em; text-align:left;">
<p>
{'How to detect stereogram picture?'|translate}<br />
{'Normal picture filename: sample.jpg or 20180101T123059_dscn9876.jpg'|translate}<br />
{'Stereogram picture filename: sample%s%s%s.jpg or 20180101T123059_dscn9876%s%s%s.jpg'|translate|sprintf:'<em>':$stereoZoom.suffix:'</em>':'<em>':$stereoZoom.suffix:'</em>'} <span class="pre">{$stereoZoom_REGEXP_detect}</span>
</p>
</div>

<form method="post" action="" class="properties">
<fieldset>
	<legend>{'Stereogram detection'|translate}</legend>
    <label>{'Define your suffix:'|translate}
	   <input type="text" name="STEREOZOOMPLUGIN_VAR_SUFFIX" value="{$stereoZoom.suffix}" size="4" />
    </label>
    ({'for instance: _rl, -lr, stereo, ...'|translate}) ({'a possible dash followed by from 2 to 6 characters'|translate}) <span class="pre">{STEREOZOOM_REGEXP_SUFFIX}</span>
</fieldset>

<fieldset>
	<legend>{'Stereogram view type'|translate}</legend>
    <label>
	   <input type="radio" name="STEREOZOOMPLUGIN_VAR_ISFORCROSSVIEW" value="true" {if ('true'== $stereoZoom.isForCrossView)}checked="checked"{/if} />
	   {'Cross view'|translate}
    </label>
    <br />
    <label>
	   <input type="radio" name="STEREOZOOMPLUGIN_VAR_ISFORCROSSVIEW" value="false" {if ('false'== $stereoZoom.isForCrossView)}checked="checked"{/if} />
	   {'Parallel view'|translate}
    </label>
</fieldset>

<fieldset>
	<legend>{'Stereogram zoom'|translate}</legend>
    <label>{'Mouse wheel zoom strength:'|translate}
	   <input type="number" name="STEREOZOOMPLUGIN_VAR_ZCTEWHEEL" value="{$stereoZoom.zCteWheel}" min="0.01" step="0.01" placeholder="0.10" id="zCteWheelNumber" />
    </label>
</fieldset>
 
<p class="formButtons"><input type="submit" name="save_config" value="{'Save Settings'|translate}"></p>
</form> 
