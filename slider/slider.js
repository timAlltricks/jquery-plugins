'use strict';

(function ($) {
    $.fn.MySlider = function (options) {
        this.settings = $.extend(
            {
                'el': $(this) || []
            }, options);

    var total = options.images.length;
    var el = this.settings.el;
    var priv = {};

    // Public Methods - External methods
    Object.assign(this, {});

    // Private Methods - Internal methods
    Object.assign(priv, {
        'addAllImages': function (images) {
            $.each(images, function(key, value) {
                priv.addImage(value, key);
            });
            $(el).append('<a class="prev" onclick="plusSlides(-1)">&#10094;</a><a class="next" onclick="plusSlides(1)">&#10095;</a>');
            $(el).after('<div class="dots" style="text-align:center"> <span class="dot" onclick="currentSlide(1)"></span> <span class="dot" onclick="currentSlide(2)"></span> <span class="dot" onclick="currentSlide(3)"></span> </div>');
        },

        'addImage': function (image, index) {
            var img = $('<img/>', {
                "width": "100%"
            });
            priv.addAttributes(img, image.attributes);
            //$(el).append(img);
            var dots = $('<div class="numbertext">' + index + ' / ' + total + '</div>');
            var txt = $('<div class="text">' + image.description + '</div>');
            var container = $('<div/>', {'class':"mySlides fade"});
            container.append(dots, img, txt);
            $(el).append(container);
        },

        'addAttributes': function(elm, attributes) {
            $.each(attributes, function(key, value) {
                $(elm).attr(key, value);
            })
        }
    });

    // Initialise the plugin
    priv.addAllImages(options.images);

    return this;
  };
}(jQuery));

const carousel = $('#slideshow-container');
const options = {
    'images': [
        {
            'description': 'Magasin de vélo',
            'attributes': {
                'src': "../images/lacremerie.jpg"
            }
        },
        {
            'description': 'Je fais du vélo acrobatique',
            'attributes': {
                'src': "../images/bio.jpg"
            }
        },
        {
            'description': 'Très joli casque garçon',
            'attributes': {
                'src': "../images/Vans-Pro-Cup-Malaga-18.jpg"
            }
        }
    ]
};

carousel.MySlider(options);

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}