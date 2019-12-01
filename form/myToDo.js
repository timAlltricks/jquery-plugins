'use strict';

(function ($) {
  $.fn.MyForm = function (options) {
    this.settings = $.extend({
      'el': $(this) || [],
      'form': {
        'inputs': [{
            1:{
                'attributes': {
                    'placeHolder': 'blabla',
                    'required': false
                }
            }
        }]
      }
    }, options);

    var el = this.settings.el;
    var priv = {};

    el.on("submit", function(){
        priv.submit();
    });

    // Public Methods - External methods
    Object.assign(this, {});

    // Private Methods - Internal methods
    Object.assign(priv, {
        
        'addAllInputs': function(options, parent) {
            $.each(options, function(key, value) {
                priv.addInput(value, parent);
            })
        },

        'addInput': function(options, parent) {
            const input = jQuery('<' + options.tag + '/>');
            if(options.innerHTML) input.append(options.innerHTML);
            if(options.regExp){
                input.on("change", function(){
                    var patt = new RegExp(options.regExp);
                    if(patt.test(input.val())) input.css("color", "green");
                    else input.css("color", "red");
                })
            }
            priv.addAttributes(input, options.attributes)
            if(parent) parent.append(input);
            else el.append(input);
            return input;
        },

        'addAttributes': function(elm, attributes) {
            $.each(attributes, function(key, value) {
                if(key === "children") priv.addAllInputs(value, elm);
                else $(elm).attr(key, value);
            })
        },

        'submit': function(){
            alert($(el).serialize());
        }
    });

    // Initialise the plugin
    priv.addAllInputs(this.settings.form.inputs);
    priv.addInput({
        'tag': 'input',
        'attributes': {
            'type': "submit"
        }
    });

    return this;
  };
}(jQuery));

const form = $('#formulaire');
const options = {
    'form': {
        'inputs': [
            {
                'tag': 'input',
                'attributes': {
                    'type': "text",
                    'name': "nom",
                    'placeHolder': 'nom',
                    'required': true
                }
            },
            {
                'tag': 'input',
                'regExp': "e",
                'attributes': {
                    'type': "text",
                    'name': "prenom",
                    'placeHolder': 'prenom',
                    'required': true
                }
            },
            {
                'tag': 'select',
                'attributes': {
                    'name': "prenom",
                    'placeHolder': 'prenom',
                    'required': true,
                    'children': [
                        {
                            'tag': 'option',
                            'innerHTML': 'option1',
                            'attributes': {
                                'name': "prenom"
                            }
                        },
                        {
                            'tag': 'option',
                            'innerHTML': 'option2',
                            'attributes': {
                                'name': "nom"
                            }
                        }
                    ]
                }
            }
        ]
  }
};

form.MyForm(options);