/* This kills promoted items and anything that is not an original post. No more seeing every action your connections make*/
var domObserver = new MutationObserver(() => { 
  console.log("Found one element");
  Array.from(document.getElementsByClassName('relative ember-view')).forEach(i=> {if(/sponsorisé<|class="feed-shared-text-view"/.test(i.innerHTML)){i.outerHTML = '';}});
});
domObserver.observe(document.getElementsByClassName('core-rail')[0], {
  childList: true,
  subtree: true
});
