//= require tinymce
//= require tinymce-jquery

tinyMCE.init({
  selector: 'textarea#tinymce',
  plugins : 'advlist autolink link image lists charmap preview code',
  relative_urls: false,
  remove_script_host : false,
  document_base_url : 'https://podawful.pizza/'
})
