$(document).bind("mobileinit", function()
{
    if (navigator.userAgent.indexOf("Android") != -1)
    {
        $.mobile.defaultPageTransition = 'none';
        $.mobile.defaultDialogTransition = 'none';
    }
});