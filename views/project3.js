(function(angular) {
    'use strict';

    angular.module('myApp.project3Ctrl', ['ngRoute', 'myApp.mainFactory'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/proyectos/zeendo', {
            templateUrl: 'views/project3.html',
            controller: 'project3Ctrl',
            activetab: 'project3',
            resolve: {
                "prevLoad": function($location, mainFactory) {
                    //window.alert("Desde antes cargar vista" + mainFactory.getMenuAbierto());
                }
            }
        });
    }])

    .controller('project3Ctrl', ['$scope', '$rootScope', 'mainFactory', 'eventsFactory', function($scope, $rootScope, mainFactory, eventsFactory) {
        angular.element(document).ready(function() {
            mainFactory.preloadImages();
            eventsFactory.subscribe($scope, function somethingChanged() {
                // Si se lanza evento desde factoria que carga imágenes arrancamos la vista
                init();
            });

            function init() {

                var useScrollMagic = mainFactory.useScrollMagic();
                // Iniciamos funciones comunes a todas las vistas desde la Factoria
                mainFactory.initCommons();
                mainFactory.setMenuAbierto(false);
                mainFactory.setNextProject("Muchosol", "proyectos/muchosol");
                mainFactory.setCurrentProject("Zeendo");
                // SCROLL MAGIC - ANIMACIÓN INTRO
                if (useScrollMagic) {

                    var introTl = new TimelineMax();

                    introTl
                        .fromTo('.claim', 1, {
                            y: -80,
                        }, {
                            y: -160
                        }, 0)
                        .fromTo($('#intro .additionalContent, #intro #closeAboutSVG ,#intro .aboutMeBtn, #intro .scrollDown,#lineaCerrar1,#lineaCerrar2'), 1, {
                            opacity: 1,
                        }, {
                            opacity: 0,
                            ease: Power4.easeNone
                        }, 0)
                        .to($('.darkOverlay'), 1.4, {
                            autoAlpha: 0,
                            ease: Power1.easeOut
                        }, 0)
                        .fromTo($('#second-section h2, #second-section h3'), 1, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            ease: Power4.easeNone
                        }, 2.7)
                        .fromTo($('#second-section ul.roleUl, #second-section ul.clientUl'), 1, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            ease: Power4.easeNone
                        }, 1.7)
                        .fromTo($('#second-section ul.urls'), 1, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            ease: Power4.easeNone
                        }, 1.2);

                    var duracionScreen = useScrollMagic ? window.outerHeight : window.outerHeight - 100
                    var introScene = new ScrollMagic.Scene({
                            triggerElement: '#second-section',
                            duration: duracionScreen,
                            /* distance of zoom scroll */
                            offset: 0,
                            triggerHook: 'onLeave'
                        })
                        //.addTo(mainFactory._scrollMagicController)
                        .setTween(introTl)
                        .setPin('#second-section')
                        .on('progress', function(e) {
                            if (e.progress * 100 >= 90) {
                                mainFactory.viewer().setOptions({
                                    pauseRender: true
                                });
                            } else {
                                mainFactory.viewer().setOptions({
                                    pauseRender: false
                                });
                            }
                        });

                } else {
                    TweenMax.set($('.darkOverlay'), {
                        autoAlpha: 0

                    });
                }


                // SCROLL MAGIC -> Apartado #bloque-final-proyecto
                if (useScrollMagic) {
                    mainFactory.setBloqueFinActivo(false);
                    TweenMax.set($('#bloque-fin-proyecto'), {
                        autoAlpha: 0
                    });
                    var bloqueFinalScene = new ScrollMagic.Scene({
                            triggerElement: '#proyecto-aguas-bloque5',
                            duration: 10,
                            /* distance of zoom scroll */
                            offset: 0,
                            triggerHook: 'onLeave'
                        })
                        //.addTo(mainFactory._scrollMagicController)
                        .setPin('#proyecto-aguas-bloque5')
                        .on('progress', function(e) {
                            if (e.progress * 100 >= 90) {
                                mainFactory.setBloqueFinActivo(true);
                                TweenMax.set($('#bloque-fin-proyecto'), {
                                    autoAlpha: 1
                                });
                            } else {
                                mainFactory.setBloqueFinActivo(false);
                                if (!mainFactory.getAbriendoApartado()) {
                                    TweenMax.set($('#bloque-fin-proyecto'), {
                                        autoAlpha: 0
                                    });
                                }

                            }
                        });
                } else {
                    TweenMax.set($('#bloque-fin-proyecto'), {
                        autoAlpha: 1
                    });
                }
                // Se escale con o sin Magic Scroll
                var contIsoApp = $(".contScreensApp");
                var escalaAppIso = 1;

                // RESPONSIVE

                $(window).resize(function() {
                    if ($.isXs()) {
                        escalaAppIso = 2;
                    } else if ($.isSm()) {
                        escalaAppIso = 2;
                    } else if ($.isMd()) {
                        escalaAppIso = 1;
                    } else if ($.isLg()) {
                        escalaAppIso = 1;
                    }
                    TweenMax.set(".contScreensApp", {
                        scale: escalaAppIso
                    });
                }).resize();

                TweenMax.set(contIsoApp, {
                    rotationX: 15,
                    rotationY: 0,
                    rotationZ: 30,
                    transformPerspective: 900,
                    scale: escalaAppIso,
                    transformOrigin: "50% 50% 50%"
                });

                if (useScrollMagic) {
                    // SCROLL MAGIC -> Proyectos / Aguas de Valencia / Infografías

                    var infografiaScene = new ScrollMagic.Scene({
                            triggerElement: '.fondoAzul',
                            duration: 1000,
                            offset: 0,
                            triggerHook: 'onLeave'
                        })
                        //.addTo(mainFactory._scrollMagicController)
                        .setPin('.fondoAzul');

                    var infografiaVideoScene = new ScrollMagic.Scene({
                            triggerElement: '.fondoAzul',
                            duration: 1000 + ($(".fondoAzul").height() * 2),
                            offset: 0,
                            triggerHook: 'onEnter'
                        });

                    // SCROLL MAGIC -> Proyectos / Aguas de Valencia / Screens APP parallax

                    var screensAPPtl = new TimelineMax();

                    screensAPPtl
                        .fromTo($('#img-screens-aguas1'), 3, {
                            yPercent: -40

                        }, {
                            yPercent: -20
                        }, 0)
                        .fromTo($('#img-screens-aguas2'), 3, {
                            yPercent: -20
                        }, {
                            yPercent: -40
                        }, 0);

                    var screensParallaxScene = new ScrollMagic.Scene({
                            triggerElement: '#proyecto-aguas-bloque4',
                            duration: $('#proyecto-aguas-bloque4').height() * 2,
                            offset: 0,
                            triggerHook: 'onEnter'
                        })
                        //.addTo(mainFactory._scrollMagicController)
                        .setTween(screensAPPtl);
                } else {

                };

                // Init Magic Scroll
                var escenas = [screensParallaxScene, introScene, bloqueFinalScene, infografiaScene, infografiaVideoScene];
                mainFactory.setEscenasView(escenas);
                if (useScrollMagic) {
                    mainFactory.initMagicScrolls();
                } else {
                    mainFactory.initMobile();
                }
            }

        });
    }]);

}(window.angular));
