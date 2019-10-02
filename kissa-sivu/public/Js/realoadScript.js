function reload_js(src) {
    console.log("reloading '/Js/main.js'")
    $('script[src="' + src + '"]').remove();
    $('<script>').attr('src', src).appendTo('head');
}
reload_js('/Js/main.js');