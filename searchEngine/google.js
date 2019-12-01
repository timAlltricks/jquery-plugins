'use strict';

(function ($) {
    $.fn.MyGoogle = function (options) {
        this.settings = $.extend(
            {
                'el': $(this) || []
            }, options);

    var total = options.pokemons.length;
    var el = this.settings.el;
    var priv = {};

    // Public Methods - External methods
    Object.assign(this, {});

    // Private Methods - Internal methods
    Object.assign(priv, {
        'init': function(){
            var container = $('<div class="input-group">')
            var drop = $('<div class="input-group-append"><button type="button" id="btn-search" class="btn btn-outline-secondary">Search</button><button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only">Toggle Dropdown</span></button><div class="dropdown-menu"></div></div>');
            var input = $('<input/>', {
                "maxLength": 20,
                "placeholder": "Search for pokemons...",
                "class": "form-control",
                "aria-label": "Search pokemons by their names",
                "type": "text"

            });
            input.keypress(function(){
                priv.displaySugg(priv.search(input.val()));
            });
            input.on("change", function(){
                priv.displayPok(priv.search(input.val()));
            });
            el.find('#btn-search').click(function(){
                priv.hideSugg();
                priv.displayPok(priv.search(input.val()));
            });
            container.append(input);
            container.append(drop);
            el.append('<p class="h1">Pokemon search / Google Pokemon</p>');
            el.append(container);
        },

        'search': function(search) {
            let reg = new RegExp(search.toUpperCase());
            return this.settings.pokemons
                .map((pokemon) => (reg.test((pokemon.nom + ' ' + pokemon.prenom).toUpperCase())? pokemon : false))
                .filter((result) => result.length !== 0 && result !== false)
        }.bind(this),

        'displayPok': function(poks) {
            priv.hideSugg();
            if(el.find(".card-deck")) el.find(".card-deck").remove();
            var cardDeck = $('<div/>', {"class":"card-deck"});
            $.each(poks, function(key, value){
                var card = $('<div class="card"/>');
                var cardImg = $('<img src="' + value.photo + '" class="card-img-top"/>');
                var cardBody = $('<div class="card-body"/>');
                var cardTitle = $('<h5 class="card-title"/>');
                cardTitle.html(value.nom + ' ' + value.prenom);
                var cardText = $('<p class="card-text"/>');
                cardText.append('<p>Type : ' + value.type + '</p>');
                cardText.append('<p>Pois : ' + value.poids + '</p>');
                var stats = $('<b/>');
                stats.append('<p>Vitesse : ');
                stats.append('<p>Attaque : ');
                stats.append('<p>Défense : ');
                stats.append('<p>Vie : ');
                cardText.append(stats);
                cardBody.append(cardTitle);
                cardBody.append(cardText);
                var cardFooter = $('<div class="card-footer"/>');
                cardFooter.append('<div class="text-muted">search result');
                card.append(cardImg);
                card.append(cardBody);
                card.append(cardFooter);
                cardDeck.append(card);
            });
            if(poks.length === 0) cardDeck.append('<p class="text-muted mx-4">No result</p>');
            el.append(cardDeck);
        },

        'displaySugg': function(poks) {
            var dropdown = el.find('.dropdown-menu');
            dropdown.empty();
            $.each(poks, function(key, value){
                var link = $('<a class="dropdown-item">' + value.nom + ' ' + value.prenom +'</a>');
                link.click(function(){
                    priv.displayPok(priv.search(value.nom + ' ' + value.prenom));
                });
                dropdown.append(link);
            });
            console.log(poks);
            if(poks.length === 0) dropdown.append('<a class="dropdown-item">No suggestion</a>');
            $(dropdown).dropdown('show');
        },

        'hideSugg': function() {
            var dropdown = el.find('.dropdown-menu');
            $(dropdown).dropdown('hide');
        },

        'list': function(property, choosen) {
            let reg = new RegExp(choosen.toUpperCase());
            return this.settings.pokemons
                .map((pokemon) => (reg.test((pokemon[property]).toUpperCase())? pokemon : false))
                .filter((result) => result.length !== 0 && result !== false)
        }.bind(this),

        'makeList': function(property) {
            let reg = new RegExp(property.toUpperCase());
            return Array.from(new Set(this.settings.pokemons
                .map((pokemon) => (pokemon[property].toUpperCase()? pokemon[property] : false))))
        }.bind(this),

        'initList': function(property, options) {
            var select = $('<select class="custom-select"/>');
            select.append('<option selected>Choose...</option>');
            $.each(options, function(key, value){
                var opt = $('<option/>', {"value": value});
                opt.attr("prop", property);
                opt.html(value);
                select.append(opt);
            });
            select.on("change", function(){
                let val = $(this.options[this.selectedIndex]).attr("value");
                let prop = $(this.options[this.selectedIndex]).attr("prop");
                priv.displayPok(priv.list(prop, val));
            });
            el.append(select);
        },

        'initAllLists': function(options){
            $.each(options, function(key, value){
                priv.initList(value, priv.makeList(value));
            });
        }

    });

    // Initialise the plugin
    priv.init();
    //priv.displayPok(priv.search("pier"));
    priv.initAllLists(["type", "poids"]);
    return this;
  };
}(jQuery));

const carousel = $('#slideshow-container');
const options = {
    'pokemons': [
        {
            'nom': 'Dracofeu',
            'prenom': 'Jean',
            'poids': 'heavy',
            'photo': '../images/dracofeu.png',
            'type': 'feu'
        },
        {
            'nom': 'Mewtwo',
            'prenom': 'Géraldine',
            'poids': 'medium',
            'photo': '../images/mewtwo.png',
            'type': 'mythique'
        },
        {
            'nom': 'Hyporoi',
            'prenom': 'Victor',
            'poids': 'light',
            'photo': '../images/hyporoi.png',
            'type': 'eau'
        },
        {
            'nom': 'Tortank',
            'prenom': 'Franck',
            'poids': 'heavy',
            'photo': '../images/tortank.png',
            'type': 'terre'
        },
        {
            'nom': 'Torterra',
            'prenom': 'Bertand',
            'poids': 'heavy',
            'photo': '../images/torterra.png',
            'type': 'terre'
        }
    ]
};

carousel.MyGoogle(options);