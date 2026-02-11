//= require tinymce
//= require tinymce-jquery

(function() {
  function initializeTinyMCE() {
    if (typeof tinyMCE === 'undefined') {
      console.warn('TinyMCE not loaded yet, waiting...');
      setTimeout(initializeTinyMCE, 100);
      return;
    }

    // Find all textareas with the tinymce class that haven't been initialized
    var textareas = document.querySelectorAll('.tinymce');
    
    textareas.forEach(function(textarea) {
      // Skip if already initialized
      if (textarea.id && tinymce.get(textarea.id)) {
        return;
      }
      
      // Generate an ID if one doesn't exist
      if (!textarea.id) {
        textarea.id = 'tinymce-' + Math.random().toString(36).substr(2, 9);
      }
      
      // Get custom options from data attribute
      var customOptions = {};
      if (textarea.dataset.tinymceOptions) {
        try {
          customOptions = JSON.parse(textarea.dataset.tinymceOptions);
        } catch (e) {
          console.error('Failed to parse TinyMCE options:', e);
        }
      }
      
      // Default configuration
      var defaultOptions = {
        selector: '#' + textarea.id,
        plugins: 'advlist autolink link image lists charmap preview code fullscreen table help wordcount',
        toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code | help',
        menubar: true,
        branding: false,
        relative_urls: false,
        remove_script_host: false,
        document_base_url: 'https://podawful.pizza/'
      };
      
      // Merge custom options with defaults (custom options take precedence)
      var finalOptions = Object.assign({}, defaultOptions, customOptions);
      
      // Initialize TinyMCE for this specific textarea
      tinyMCE.init(finalOptions);
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTinyMCE);
  } else {
    initializeTinyMCE();
  }

  // Re-initialize on Turbolinks page loads
  document.addEventListener('turbolinks:load', function() {
    // Remove old instances before reinitializing
    tinymce.remove('.tinymce');
    setTimeout(initializeTinyMCE, 100);
  });
})();

