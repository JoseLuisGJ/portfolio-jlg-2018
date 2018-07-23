(function(angular) {

    'use strict';

    angular.module('myApp.mainFactory', [])

    .factory("mainFactory", ['$route', 'preloader', 'eventsFactory', function($route, preloader, eventsFactory) {

        var depthyElement = document.getElementById("lol");
        var options = {};
        var _viewer = new DepthyViewer(depthyElement, options);

        var bloqueFinActivo = false;

        function is_touch_device() {
            return 'ontouchstart' in window || 'onmsgesturechange' in window;
        };



        var _BrowserDetect = {
            init: function() {
                this.browser = this.searchString(this.dataBrowser) || "Other";
                this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
            },
            searchString: function(data) {
                for (var i = 0; i < data.length; i++) {
                    var dataString = data[i].string;
                    this.versionSearchString = data[i].subString;

                    if (dataString.indexOf(data[i].subString) !== -1) {
                        return data[i].identity;
                    }
                }
            },
            searchVersion: function(dataString) {
                var index = dataString.indexOf(this.versionSearchString);
                if (index === -1) {
                    return;
                }

                var rv = dataString.indexOf("rv:");
                if (this.versionSearchString === "Trident" && rv !== -1) {
                    return parseFloat(dataString.substring(rv + 3));
                } else {
                    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
                }
            },

            dataBrowser: [{
                    string: navigator.userAgent,
                    subString: "Edge",
                    identity: "MS Edge"
                }, {
                    string: navigator.userAgent,
                    subString: "MSIE",
                    identity: "Explorer"
                }, {
                    string: navigator.userAgent,
                    subString: "Trident",
                    identity: "Explorer"
                }, {
                    string: navigator.userAgent,
                    subString: "Firefox",
                    identity: "Firefox"
                }, {
                    string: navigator.userAgent,
                    subString: "Opera",
                    identity: "Opera"
                }, {
                    string: navigator.userAgent,
                    subString: "OPR",
                    identity: "Opera"
                },

                {
                    string: navigator.userAgent,
                    subString: "Chrome",
                    identity: "Chrome"
                }, {
                    string: navigator.userAgent,
                    subString: "Safari",
                    identity: "Safari"
                }
            ]
        };



        var _useScrollMagic = function() {
            return $(window).width() > 768; //&& !is_touch_device()
        }

        // CAMBIO COLOR TEXTOS

        function isOverlap(idOne, idTwo) {
            var objOne = idOne,
                objTwo = idTwo,
                offsetOne = objOne.offset(),
                offsetTwo = objTwo.offset(),
                topOne = offsetOne.top,
                topTwo = offsetTwo.top,
                heightOne = objOne.height(),
                heightTwo = objTwo.height();
            //console.log(topOne, topTwo);
            var jose = topOne > topTwo && topOne + heightOne < topTwo + heightTwo;
            return jose;
        }

        var textoSeeAll = $("#menuAllProjects h4");
        var lineaSeeAll = CSSRulePlugin.getRule("#menuAllProjects h4:before");
        var textoJoseLuis = $("#flechaSubir h4");
        var flechaSubirSVG = $("#flechaSubirSVG");
        var breadcrumbs = $("#breadcrumbs h4");

        $(window).on("scroll", detectOverlap);

        var overlap1a,
            overlap2a,
            overlap3a,
            overlap4a,
            overlap1b,
            overlap2b,
            overlap3b,
            overlap4b,
            topOscuro = false,
            bottomOscuro = false;

        function detectOverlap() {

            if ($(".fondo-oscuro").length) {
                overlap1a = isOverlap($("#menuAllProjects"), $(".fondo-oscuro"));
            } else {
                overlap1a = undefined;
            };
            if ($(".fondo-oscuro2").length) {
                overlap2a = isOverlap($("#menuAllProjects"), $(".fondo-oscuro2"));
            } else {
                overlap2a = undefined;
            };
            if ($(".fondo-oscuro3").length) {
                overlap3a = isOverlap($("#menuAllProjects"), $(".fondo-oscuro3"));
            } else {
                overlap3a = undefined;
            };
            if ($(".fondo-oscuro4").length) {
                overlap4a = isOverlap($("#menuAllProjects"), $(".fondo-oscuro4"));
            } else {
                overlap4a = undefined;
            };


            if (overlap1a || overlap2a || overlap3a || overlap4a) {
                if (topOscuro == true && !abriendoApartado) {
                    //console.log("top a blanco");

                    TweenLite.set(textoSeeAll, {
                        css: {
                            color: "#fff"
                        }
                    });
                    TweenLite.set(breadcrumbs, {
                        css: {
                            color: "#fff"
                        }
                    });
                    TweenLite.set(lineaSeeAll, {
                        backgroundColor: "rgba(255, 255, 255,0.5)"
                    });
                }

                topOscuro = false;

            } else {
                if (topOscuro == false && !abriendoApartado) {
                    //console.log("top a oscuro");

                    TweenLite.set(textoSeeAll, {
                        css: {
                            color: "#7A7A7A"
                        }
                    });
                    TweenLite.set(breadcrumbs, {
                        css: {
                            color: "#7A7A7A"
                        }
                    });
                    TweenLite.set(lineaSeeAll, {
                        backgroundColor: "#ABABAB"
                    });
                }


                topOscuro = true;

            }
            //console.log(isOverlap($("#flechaSubir"), $(".fondo-oscuro")));


            if ($(".fondo-oscuro").length) {
                overlap1b = isOverlap($("#flechaSubir"), $(".fondo-oscuro"));
            } else {
                overlap1b = undefined;
            };
            if ($(".fondo-oscuro2").length) {
                overlap2b = isOverlap($("#flechaSubir"), $(".fondo-oscuro2"));
            } else {
                overlap2b = undefined;
            };
            if ($(".fondo-oscuro3").length) {
                overlap3b = isOverlap($("#flechaSubir"), $(".fondo-oscuro3"));
            } else {
                overlap3b = undefined;
            };
            if ($(".fondo-oscuro4").length) {
                overlap4b = isOverlap($("#flechaSubir"), $(".fondo-oscuro4"));
            } else {
                overlap4b = undefined;
            };


            if (overlap1b || overlap2b || overlap3b || overlap4b || bloqueFinActivo) {
                if (bottomOscuro == true && !abriendoApartado) {
                    TweenLite.set(textoJoseLuis, {
                        css: {
                            color: "#fff"
                        }
                    });
                    flechaSubirSVG.attr({
                        "stroke": "rgba(255, 255, 255,0.5)"
                    });
                }
                bottomOscuro = false;
            } else {
                if (bottomOscuro == false && !abriendoApartado) {
                    TweenLite.set(textoJoseLuis, {
                        css: {
                            color: "#7A7A7A"
                        }
                    });
                    flechaSubirSVG.attr({
                        "stroke": "rgba(122, 122, 122,1)"
                    });
                }
                bottomOscuro = true;
            }
        }

        // SCROLL MAGIC
        var _scrollMagicController;
        var escenasFromView;
        var menuAbierto = false;
        var abriendoApartado = false;
        var cargandoDesdeMenu = false;
        var urlNextProject = "proyectos/energy-system";
        var _firstProyect = true;
        var _initMagicScrolls = function() {

            if (_scrollMagicController) {
                _scrollMagicController.destroy(true);
                _scrollMagicController = null;
            }
            _scrollMagicController = new ScrollMagic.Controller({});
            // change behaviour of controller to animate scroll instead of jump
            _scrollMagicController.scrollTo(function(newpos, instantaneo) {
                var tiempo;
                if (instantaneo) {
                    TweenMax.set(window, {
                        scrollTo: {
                            y: newpos
                        }
                    });
                } else {
                    TweenMax.to(window, 0.3, {
                        scrollTo: {
                            y: newpos
                        }
                    });
                }
            });
            // AÑADIMOS ESCENAS DE LAS VISTAS
            for (var i = 0; i < escenasFromView.length; i++) {
                _scrollMagicController.addScene(escenasFromView[i]);
            }
            if (!_firstProyect) {

                _scrollMagicController.scrollTo(window.innerHeight, true);
            }
            _firstProyect = false;
            TweenLite.delayedCall(0.3, detectOverlap);

            // SCROLL DOWN
            $('.scrollDown').prop('onclick', null).off('click');
            $(".scrollDown").on("click", function(e) {
                e.preventDefault();
                _scrollMagicController.scrollTo(window.innerHeight);
            });
            // FLECHA SUBIR
            $('#flechaSubir').prop('onclick', null).off('click');
            $("#flechaSubir").on("click", function(e) {
                e.preventDefault();
                _scrollMagicController.scrollTo("#intro");

            });

            // SCROLL MAGIC -> Objetos parallax
            $('.obj-parallax').each(function() {
                var inicio = $(this).attr('data-inicio') || 0;
                var destino = $(this).attr('data-destino');
                var objParallaxTween = TweenMax.fromTo($(this), 1, {
                    y: inicio
                }, {
                    y: destino
                });
                var objParallaxScene = new ScrollMagic.Scene({
                        triggerElement: '.fondoBlanco',
                        duration: $(window).height() * 2,
                        offset: -650,
                        triggerHook: 'onLeave'
                    })
                    .addTo(_scrollMagicController)
                    .setTween(objParallaxTween);
            });
            // MAGIC SCROLL -> Objetos fadein con desplazamiento vertical
            $('.obj-appear').each(function() {
                var retardo = $(this).attr('data-delay') || 0;
                var fromY = $(this).attr('data-fromY') || 150;
                var toY = $(this).attr('data-toY') || 0;
                var objAppearTween = TweenMax.fromTo($(this), 0.95, {
                    y: fromY,
                    opacity: 0
                }, {
                    y: toY,
                    opacity: 1,
                    delay: retardo,
                    ease: Expo.easeOut
                });

                var objAppearScene = new ScrollMagic.Scene({
                        triggerElement: '#' + $(this).attr('id'),
                        offset: 80,
                        triggerHook: 'onEnter'
                    })
                    .addTo(_scrollMagicController)
                    .setTween(objAppearTween);
            });

            // MAGIC SCROLL -> Cambio breadcrumbs
            var oldSection;
            var _texto = $("#breadcrumbs h4 span.sub");

            $('.obj-breadcrumbs').each(function() {
                var texto = $(this).attr('data-texto');
                var objAppearScene = new ScrollMagic.Scene({
                    triggerElement: '#' + $(this).attr('id'),
                    offset: 0,
                    duration: $(this).height(),
                    triggerHook: 0.5
                })

                .addTo(_scrollMagicController)
                    .on('start', function(e) {
                        if (e.scrollDirection === "FORWARD") {
                            if (texto == "") {
                                _texto.text(texto);
                            } else {
                                _texto.text(" / " + texto);
                            }

                            TweenMax.fromTo(_texto, 0.5, {
                                x: -10,
                                opacity: 0
                            }, {
                                x: 0,
                                opacity: 1,
                                ease: Expo.easeOut
                            });
                        }
                    })
                    .on('end', function(e) {
                        if (e.scrollDirection === "REVERSE") {
                            if (texto == "") {
                                _texto.text(texto);
                            } else {
                                _texto.text(" / " + texto);
                            }
                            TweenMax.fromTo(_texto, 0.5, {
                                x: -10,
                                opacity: 0
                            }, {
                                x: 0,
                                opacity: 1,
                                ease: Expo.easeOut
                            });
                        }
                    });
            });

        }


        var previousValue = _useScrollMagic();


        function destroyScrollMagic() {

            if (_scrollMagicController) {
                _scrollMagicController.destroy(true);
                _scrollMagicController = null;
            }

        }

        function createScrollMagic() {}
        var _firstLoad = true;

        return {
            viewer: function() {
                return _viewer;
            },
            initCommons: function() {

                // Reseteamos footer si venimos desde NEXT PROJECT

                if (abriendoApartado) {

                    var lineaNectProject = CSSRulePlugin.getRule("#bloque-fin-proyecto h3:before");
                    TweenMax.set(lineaNectProject, {
                        width: "30px",
                        backgroundColor: "#8E8E8E"
                    });
                    TweenMax.set("#bloque-fin-proyecto", {
                        zIndex: "-1"
                    });
                    TweenMax.set("#bloque-fin-proyecto h5,#bloque-fin-proyecto h3", {
                        opacity: 1,
                        color: "#8E8E8E"
                    });

                    TweenMax.set("#bloque-fin-proyecto", {
                        height: ""
                    });
                    TweenMax.set("#bloque-fin-proyecto .img-fondo-proyecto", {
                        opacity: 0
                    });

                    abriendoApartado = false;
                }


                // Hover linea animada para textos
                $("html.no-touchevents .hoverLinea").mouseenter(function() {
                    var lineaHoverTL = new TimelineMax();
                    $(this).prepend("<div class='lineaHover'><div>");
                    lineaHoverTL
                        .fromTo($(this).find(".lineaHover"), 0.15, {
                            width: '0%',
                            left: 0,
                            right: 'auto'
                        }, {
                            width: '100%',
                            ease: Power3.easeOut
                        })
                        .set($(this).find(".lineaHover"), {
                            left: 'auto',
                            right: 0
                        })
                        .to($(this).find(".lineaHover"), 0.15, {
                            width: '0%',
                            ease: Power3.easeOut
                        });
                }).mouseleave(function() {
                    $(this).find(".lineaHover").remove();
                });

                // Si cargamos desde el menu
                if (menuAbierto) {

                    TweenMax.to('#menuProyectos', 0.1, {
                        autoAlpha: 0,
                        delay: 0.5,
                        onStart: function() {}
                    });
                    var objetosEntraTL = new TimelineMax({
                        onComplete: function() {
                            cargandoDesdeMenu = false;
                        }
                    });
                    TweenLite.set('#second-section h2, #second-section h3,#second-section ul.roleUl, #second-section ul.clientUl,#second-section ul.urls,#second-section img.img-proyecto', {
                        autoAlpha: 0,
                    });

                    objetosEntraTL
                        .fromTo($('#breadcrumbs, #menuAllProjects, #flechaSubir'), 0.9, {
                            y: "+=30",
                            autoAlpha: 0
                        }, {
                            y: 0,
                            autoAlpha: 1,
                            ease: Expo.easeOut
                        }, 0.25)
                        .fromTo($('#second-section h2, #second-section h3'), 0.9, {
                            autoAlpha: 0,
                            y: "+=50"
                        }, {
                            //y: 0,
                            autoAlpha: 1,
                            y: 0,
                            ease: Expo.easeOut
                        }, 0.3)
                        .fromTo($('#second-section ul.roleUl, #second-section ul.clientUl'), 0.9, {
                            y: "+=50",
                            autoAlpha: 0
                        }, {
                            y: 0,
                            autoAlpha: 1,
                            ease: Expo.easeOut
                        }, 0.4)
                        .fromTo($('#second-section ul.urls'), 0.9, {
                            y: "+=50",
                            autoAlpha: 0
                        }, {
                            y: 0,
                            autoAlpha: 1,
                            ease: Expo.easeOut
                        }, 0.5)
                        .fromTo($('#second-section img.img-proyecto'), 1.2, {
                            y: "+=50",
                            autoAlpha: 0
                        }, {
                            y: 0,
                            autoAlpha: 1,
                            ease: Expo.easeOut
                        }, 0.6);
                }


            },

            scrollMagicController: function() {
                return _scrollMagicController;
            },
            initMagicScrolls: function() {

                if (_scrollMagicController) {

                    _scrollMagicController.destroy(true);
                    _scrollMagicController = null;

                }

                _scrollMagicController = new ScrollMagic.Controller({});
                // change behaviour of controller to animate scroll instead of jump
                _scrollMagicController.scrollTo(function(newpos, instantaneo) {
                    var tiempo;

                    if (instantaneo) {
                        TweenMax.set(window, {
                            scrollTo: {
                                y: newpos
                            }
                        });
                    } else {
                        TweenMax.to(window, 0.3, {
                            scrollTo: {
                                y: newpos
                            }
                        });

                    }

                });
                // AÑADIMOS ESCENAS DE LAS VISTAS
                for (var i = 0; i < escenasFromView.length; i++) {
                    _scrollMagicController.addScene(escenasFromView[i]);
                }
                if (!_firstProyect) {

                    _scrollMagicController.scrollTo(window.innerHeight, true);
                }
                _firstProyect = false;
                TweenLite.delayedCall(0.3, detectOverlap);

                // SCROLL DOWN
                $('.scrollDown').prop('onclick', null).off('click');
                $(".scrollDown").on("click", function(e) {
                    e.preventDefault();
                    _scrollMagicController.scrollTo(window.innerHeight);
                });
                // FLECHA SUBIR
                $('#flechaSubir').prop('onclick', null).off('click');
                $("#flechaSubir").on("click", function(e) {
                    e.preventDefault();
                    _scrollMagicController.scrollTo("#intro");

                });

                // SCROLL MAGIC -> Objetos parallax
                $('.obj-parallax').each(function() {
                    var inicio = $(this).attr('data-inicio') || 0;
                    var destino = $(this).attr('data-destino');
                    var objParallaxTween = TweenMax.fromTo($(this), 1, {
                        y: inicio
                    }, {
                        y: destino
                    });
                    var objParallaxScene = new ScrollMagic.Scene({
                            triggerElement: '.fondoBlanco',
                            duration: $(window).height() * 2,
                            offset: -650,
                            triggerHook: 'onLeave'
                        })
                        .addTo(_scrollMagicController)
                        .setTween(objParallaxTween);
                });
                // MAGIC SCROLL -> Objetos fadein con desplazamiento vertical
                $('.obj-appear').each(function() {
                    var retardo = $(this).attr('data-delay') || 0;
                    var fromY = $(this).attr('data-fromY') || 150;
                    var toY = $(this).attr('data-toY') || 0;
                    var objAppearTween = TweenMax.fromTo($(this), 0.95, {
                        y: fromY,
                        opacity: 0
                    }, {
                        y: toY,
                        opacity: 1,
                        delay: retardo,
                        ease: Expo.easeOut
                    });

                    var objAppearScene = new ScrollMagic.Scene({
                            triggerElement: '#' + $(this).attr('id'),
                            offset: 80,
                            triggerHook: 'onEnter'
                        })
                        .addTo(_scrollMagicController)
                        .setTween(objAppearTween);
                });

                // MAGIC SCROLL -> Cambio breadcrumbs
                var oldSection;
                var _texto = $("#breadcrumbs h4 span.sub");

                $('.obj-breadcrumbs').each(function() {
                    var texto = $(this).attr('data-texto');
                    var objAppearScene = new ScrollMagic.Scene({
                        triggerElement: '#' + $(this).attr('id'),
                        offset: 0,
                        duration: $(this).height(),
                        triggerHook: 0.5
                    })

                    .addTo(_scrollMagicController)
                        .on('start', function(e) {
                            if (e.scrollDirection === "FORWARD") {
                                if (texto == "") {
                                    _texto.text(texto);
                                } else {
                                    _texto.text(" / " + texto);
                                }

                                TweenMax.fromTo(_texto, 0.5, {
                                    x: -10,
                                    opacity: 0
                                }, {
                                    x: 0,
                                    opacity: 1,
                                    ease: Expo.easeOut
                                });
                            }
                        })
                        .on('end', function(e) {
                            if (e.scrollDirection === "REVERSE") {
                                if (texto == "") {
                                    _texto.text(texto);
                                } else {
                                    _texto.text(" / " + texto);
                                }
                                TweenMax.fromTo(_texto, 0.5, {
                                    x: -10,
                                    opacity: 0
                                }, {
                                    x: 0,
                                    opacity: 1,
                                    ease: Expo.easeOut
                                });
                            }
                        });
                });
            },
            initMobile: function() {
                if (!_firstProyect) {
                    var incrementoSafari = 0;
                    if (this.is_safari_ios()) {
                        incrementoSafari = 45;
                    }

                    $('html,body').animate({
                            scrollTop: window.innerHeight+incrementoSafari
                        },
                        0);
                }
                _firstProyect = false;
                TweenLite.delayedCall(0.3, detectOverlap);

                // SCROLL DOWN
                $('.scrollDown').prop('onclick', null).off('click');
                $(".scrollDown").on("click", function(e) {
                    e.preventDefault();
                    $('html,body').animate({
                            scrollTop: window.innerHeight
                        },
                        0);
                });
                // FLECHA SUBIR
                $('#flechaSubir').prop('onclick', null).off('click');
                $("#flechaSubir").on("click", function(e) {
                    e.preventDefault();
                    $('html,body').animate({
                            scrollTop: 0
                        },
                        0);

                });
            },
            useScrollMagic: function() {
                return $(window).width() > 768; // && !is_touch_device()
            },
            setNextProject: function(nombre, url) {
                $("#bloque-fin-proyecto h3 a").text(nombre);
                var subImg = $("#menuProyectos .fondoMenuImgs");
                var img = subImg.find("img[data-image='" + url + "']").prop("src");
                //console.log(subImg.find("img[data-image='" + url + "']"));
                //console.log(subImg.find("img[data-image='" + url + "']").prop('src'));

                function cambiaFoto() {
                    if (Modernizr.objectfit) {
                        $("#bloque-fin-proyecto img").attr("src", img);
                    } else {
                        $("#bloque-fin-proyecto img").css('background-image', 'url(' + img + ')');
                    }


                }
                TweenLite.delayedCall(0.5, cambiaFoto);
                urlNextProject = url;
            },
            setCurrentProject: function(nombre) {
                $("#breadcrumbs h4 span.titulo").text(nombre);
            },
            preloadImages: function(origin) {
                var imgsArray = $("body img").map(function() {
                    return $(this).attr("src");
                }).get();

                // Preload the images; then, update display when returned.
                if (!_firstLoad) {
                    TweenLite.to("#precargador2", 0.3, {
                        autoAlpha: 1,
                        delay: 0.5
                    });
                }

                preloader.preloadImages(imgsArray)
                    .then(function() {
                            // Loading was successful.

                            if (!_firstLoad) {
                                TweenMax.killTweensOf("#precargador2");
                                TweenLite.to("#precargador2", 0.3, {
                                    autoAlpha: 0
                                });
                            }
                            _firstLoad = false;
                            eventsFactory.notify();


                        },
                        function() {
                            // Loading failed on at least one image.
                        });
            },
            BrowserDetect: function() {
                return _BrowserDetect;
            },
            getMenuAbierto: function() {
                return menuAbierto;
            },

            is_ie: function() {
                // Disable for IE
                var ua = window.navigator.userAgent;
                var old_ie = ua.indexOf('MSIE ');
                var new_ie = ua.indexOf('Trident/');
                if ((old_ie > -1) || (new_ie > -1)) {
                    return true;
                }
            },
            is_windows: function() {
                if (navigator.appVersion.indexOf("Win") != -1) {
                    return true;
                }

            },
            is_safari_ios: function() {
                if ((navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)) {
                    return true;
                }
            },
            setMenuAbierto: function(estado) {
                menuAbierto = estado;
            },
            getCargandoDesdeMenu: function() {
                return cargandoDesdeMenu;
            },
            setCargandoDesdeMenu: function(valor) {
                cargandoDesdeMenu = valor;
            },
            getUrlNextProject: function() {
                return urlNextProject;
            },
            getAbriendoApartado: function() {
                return abriendoApartado;
            },
            setAbriendoApartado: function(valor) {
                abriendoApartado = valor;
            },
            getBloqueFinActivo: function() {
                return bloqueFinActivo;
            },
            setBloqueFinActivo: function(valor) {
                bloqueFinActivo = valor;
            },
            setEscenasView: function(escenas) {
                escenasFromView = escenas;
            },
            initFactory: function() {
                _BrowserDetect.init();
                if (_useScrollMagic()) {
                    createScrollMagic();
                } else {
                    $('body').addClass('no-scroll-magic');
                }
                $(window).resize(function() {

                    // Kill for small screens
                    if ((previousValue != _useScrollMagic()) && ($(window).width() < 768)) {
                        destroyScrollMagic();
                        $route.reload();
                    } else if ((previousValue != _useScrollMagic()) && ($(window).width() > 768)) {
                        _initMagicScrolls();
                        $route.reload();
                    }
                    previousValue = _useScrollMagic();


                    if (!_useScrollMagic()) {

                        $('body').addClass('no-scroll-magic');
                    }

                    // Force better DOM repainting hack. Helps on mobile
                    $('html').addClass('force-gpu').removeClass('force-gpu');
                });
            }


        }

    }]);

}(window.angular));
