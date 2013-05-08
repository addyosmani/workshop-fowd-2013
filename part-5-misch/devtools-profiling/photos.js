var PHOTO_MARGIN_SIZE = 20;
var PHOTO_BORDER_SIZE = 10;
var PHOTO_HEIGHT = 320 + 2 * PHOTO_BORDER_SIZE + PHOTO_MARGIN_SIZE;

var photoCount = 0;
var TOTAL_PHOTO_COUNT = 6;

var $ = function(sel) {
    return document.querySelector(sel);
}
var $$ = function(sel) {
    return document.querySelectorAll(sel);
}

function addPhoto(parentEl, animate) {

    // 1 prescale
    // var imageUrl = 'photos/scotland' + (photoCount + 1) + '-small.jpg';
    var imageUrl = 'photos/scotland' + (photoCount + 1) + '.jpg';

    photoCount = ++photoCount % TOTAL_PHOTO_COUNT;

    var photo = parentEl.appendChild(document.createElement('div'));
    photo.className = 'photo';
    photo.innerHTML = '<img src="' + imageUrl + '"/>';
    if (animate) {
        photo.classList.add('hidden');
        setTimeout(function() { photo.classList.remove('hidden'); }, 1);
    }
    photo.addEventListener('click', function(e) {
        showFullPhoto(imageUrl);
    });
}

function resizeImage(image) {
    console.log('resizing ' + image.src);
}

function showFullPhoto(url) {
    // Show the overlay.

    // 3 - fix leak
    // var img = overlay.querySelector('img');
    //if (!img)
    //img = overlay.appendChild(document.createElement('img'));

    var overlay = $('.overlay');
    var img = overlay.querySelector('img');

    if (!img) {
      img = overlay.appendChild(document.createElement('img'));
      window.addEventListener('resize', function(e) {
        resizeImage(img);
      });
    }
    img.src = url;
    overlay.hidden = false;
    setTimeout(function() { overlay.classList.remove('hidden'); });
}

function stopAnimation(node) {
    // Remove and re-add the node to stop the animation.
    var parent = node.parentNode;
    var sibling = node.nextSibling;
    parent.insertBefore(parent.removeChild(node), sibling);
}

function update() {
    var photoList = $('.photoList');
    var addedCount = 0;

    var scrollTop = $('body').scrollTop;
    // 2 remove forced layout events
    //var listHeight = photoList.clientHeight;

    // 2
    // var loadingBoundary = listHeight + 100;
    var loadingBoundary = photoList.clientHeight + 100;

    while (true) {
        var viewportBottom = scrollTop + window.innerHeight;

        var loadingBoundary = listHeight + 100;

        if (photoList.lastChild && viewportBottom < loadingBoundary)
            break;
        addPhoto(photoList, true);
        ++addedCount;
        // 2
        //listHeight += PHOTO_HEIGHT;

    }

    // Stop the animation of any photos that have gone off-screen.
    var offscreen = Array.prototype.slice.call($$('.photo'), -(addedCount + 2), -2);
    for (var i = 0; i < offscreen.length; i++) {
        stopAnimation(offscreen[i]);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('scroll', update);
    update();

    $('.overlay').addEventListener('click', function(e) {
       this.classList.add('hidden');
    });
    $('.overlay').addEventListener('webkitTransitionEnd', function(e) {
        if (this.classList.contains('hidden'))
            this.hidden = true;
    });
});
