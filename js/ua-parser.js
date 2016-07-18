<script type = "text/javascript" src = "https://s3-us-west-2.amazonaws.com/workamerica-public/js/ua-parser.js"></script>

jQuery(document).ready(function(){
 var parser = new UAParser().getResult();
 var browser = parser.browser.name;
 var browserVersion = parser.browser.version;
 var device = parser.device.model;
 var deviceType = parser.device.type;
 var deviceVendor = parser.device.vendor;
 var os = parser.os.name;
 var osVersion = parser.os.version;
 $('input[name="'+ base64_encode( 'os' ) +'"]').val(os);
 $('input[name="'+ base64_encode( 'osVersion' ) +'"]').val(osVersion);
 $('input[name="'+ base64_encode( 'device' ) +'"]').val(device);
 $('input[name="'+ base64_encode( 'deviceType' ) +'"]').val(deviceType);
 $('input[name="'+ base64_encode( 'deviceVendor' ) +'"]').val(deviceVendor);
 $('input[name="'+ base64_encode( 'browser' ) +'"]').val(browser);
 $('input[name="'+ base64_encode( 'browserVersion' ) +'"]').val(browserVersion);
});
