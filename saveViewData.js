/*/
You only need the automatic scroller on the first execution if you plan to run this regularly. 
Delete the following lines if you do not want the autoScroll-to-end:
lines 11-25, line 94, line 106
The apps script currently ignores adding new rows if the profile link already exists within the spreadsheet. 
I started building a smarter system to add the person again if they view the profile multiple times, but it is not ready.
Also, be sure to delete these comments before converting to a bookmarklet. 
/*/

console.log("Starting the linkedin processing");
var webAppURL = "https://script.google.com/macros/s/AKfycbxShr_wPAksJR2s_F8EMephlNcMDjlfKjArxWxQsvcDAd9E7qT0/exec";

var prodElm =  100;

var numScrollEventsNeeded = Math.round((prodElm - 6) / 9);

function timedScroller(num) {
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, num);

}

for (i = 0; i < numScrollEventsNeeded; i++) {
  console.log("Time scroller cycle " + i);
  timedScroller(i * 1000);
}


function grouped(e, n) {
  if (e != null) {
    return e[n].toString();
  } else {
    return "";
  }
}

function validate(e, n, t) {
  if (e != null) {
    if (e.length > (n)) {
      if (t == "href") {
        return e[n].href;
      }
      if (t == "innerText") {
        return e[n].innerText;
      }
      if (t == "innerHTML") {
        return e[n].innerHTML;
      }
      if (t = 'next') {
        return e[n];
      }
    }
  } else {
    return '';
  }
}

function clearOut(str) {
  if (str == undefined) {
    return '';
  } else {
    return str.replace(/undefined|\&|\?|\#|"|\=/g, '');
  }
}

setTimeout(() => {
  console.log("Setting timeout " + i);
  var profContainer = document.getElementsByClassName("me-wvmp-viewer-card display-flex ember-view");

  console.log("Nb containers found " + profContainer.length);

  var dataArray = [];

  for (i = 1; i < (profContainer.length - 1); i++) {

   console.log("Processing the container " + i);

    var profLink = grouped(/linkedin\.com\/in\/(.+?)(?=\/|$)/.exec(validate(profContainer[i].getElementsByTagName("a"), 0, "href")), 1);

    var seen = validate(profContainer[i].getElementsByClassName("me-wvmp-viewer-card__time-ago"), 0, "innerText");

    var name = validate(profContainer[i].getElementsByClassName("me-wvmp-viewer-card__name-text"), 0, "innerText");

    var dist = validate(profContainer[i].getElementsByClassName("distance-badge"), 0, "innerText");

    var work = validate(profContainer[i].getElementsByClassName("me-wvmp-viewer-card__viewer-headline"), 0, "innerText");

    var foundVia = validate(profContainer[i].getElementsByClassName("me-wvmp-viewer-card__found-via"), 0, "innerText");
    if (work == undefined) {
      work = validate(profContainer[i].getElementsByClassName("me-wvmp-viewer-card__viewer-headline"), 0, "innerText");
    }
    dataArray.push('["' + profLink + '","' + clearOut(name) + '","' + clearOut(work) + '","' + clearOut(seen) + '","' + clearOut(dist) + '","' + clearOut(foundVia).replace(/Found you via /, '') + '"]');

  }

  var partitionArray = (array, size) => array.map((e, i) => (i % size === 0) ? array.slice(i, i + size) : null).filter((e) => e);

  var arrays = partitionArray(dataArray, 30);

  function timedPageOpen(fun, num) {

    setTimeout(() => {

      window.open(fun);

    }, num);

  }

  for (a=0; a<(arrays.length); a++) {
    var sendthis = encodeURIComponent('[' + arrays[a].toString() + ']');
    timedPageOpen(webAppURL+'?out=' + sendthis, (a * 533));
  }
}, ((numScrollEventsNeeded * 1001) + 1333));
