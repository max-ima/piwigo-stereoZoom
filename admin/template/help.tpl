{combine_css path=$STEREOZOOM_PATH|@cat:"admin/template/style.css"}

{html_style}
  h4 {
    text-align:left !important;
  }
{/html_style}


<div class="titrePage">
	<h2>{'StereoZoom'|translate}</h2>
</div>

<form method="post" action="" class="properties">
<fieldset>
  <legend>{'Keyboard usage and shortcuts'|translate}</legend>
  {$HELP_CONTENT}
</fieldset>

</form>
