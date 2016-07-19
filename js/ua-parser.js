jQuery(document).ready(function(){
  var parser = new UAParser().getResult();
  var browser = parser.browser.name;
  var browserVersion = parser.browser.version;
  var device = parser.device.model;
  var deviceType = parser.device.type;
  var deviceVendor = parser.device.vendor;
  var os = parser.os.name;
  var osVersion = parser.os.version;
  $('#os').val(os);
  $('#osVersion').val(osVersion);
  $('#device').val(device);
  $('#deviceType').val(deviceType);
  $('#deviceVendor').val(deviceVendor);
  $('#browser').val(browser);
  $('#browserVersion').val(browserVersion);
});
