"use strict";

var timeZones = Intl.supportedValuesOf('timeZone');
timeZones.forEach(function (timeZone) {
  console.log(timeZone);
});