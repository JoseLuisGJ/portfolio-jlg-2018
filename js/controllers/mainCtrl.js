(function(angular) {
    'use strict';

    angular.module('myApp.mainCtrl', [])

    .controller('mainCtrl', ['$scope', '$rootScope', 'mainFactory', 'eventsFactory', '$route', '$location', function($scope, $rootScope, mainFactory, eventsFactory, $route, $location) {
        angular.element(document).ready(function() {

            console.log('%c HELLO WORLD ALSO FROM CONSOLE  ', 'background: #222; color: #fff; font-size:25px;');
            console.log('%c José Luis González UX/UI Designer & Frontend Developer  ', 'background: #222; color: #fff');
            console.log('%c Say hello to hola@joseluisgj.com  ', 'background: #222; color: #fff');

            mainFactory.initFactory();
            objectFitImages($('.object-fit-ie-fix-footer'));

            /////////////////////
            ///// PRELOADER /////
            /////////////////////

            // number of loaded images for preloader progress
            var loadedCount = 0; //current number of images loaded
            var imagesToLoad; //number of slides with .bcg container
            var loadingProgress = 0; //timeline progress - starts at 0
            var _firstLoad = true;
            $scope.$on('$viewContentLoaded', function() {

                if (mainFactory.is_safari_ios()) {
                    $("#intro").css("background-color", "#252525")
                }

                if (!Modernizr.objectfit) {

                    objectFitImages($('.object-fit-ie-fix-header'));
                }
                if (_firstLoad) {
                    imagesToLoad = $('img').length; //number of slides with .bcg container
                    TweenMax.fromTo("#precargador h4", 1, {
                        y: "+=100",
                        opacity: "0"
                    }, {
                        y: "0",
                        opacity: "1",
                        ease: Expo.easeOut,
                        delay: 0.1,
                        onComplete: initPreloader
                    });
                }

                _firstLoad = false;

                // Si cargamos desde un URL directamente actualizamos estado de menu

                var itemsMenuProjects = $("#menuProyectos ul li");
                itemsMenuProjects.removeClass("active");

                if ($route.current.activetab == "project1") {
                    $('#menuProyectos ul li:nth-child(1)').addClass("active");
                } else if ($route.current.activetab == "project2") {
                    $('#menuProyectos ul li:nth-child(2)').addClass("active");
                } else if ($route.current.activetab == "project3") {
                    $('#menuProyectos ul li:nth-child(3)').addClass("active");
                } else if ($route.current.activetab == "project4") {
                    $('#menuProyectos ul li:nth-child(4)').addClass("active");
                }

            });

            TweenLite.set("#precargador2", {
                autoAlpha: 0,
                zIndex: 9999
            });

            function initPreloader() {
                $('body').imagesLoaded({
                    background: true
                }).progress(function(instance, image) {
                    loadProgress();
                });
            }

            function loadProgress(imgLoad, image) {
                //one more image has been loaded
                loadedCount++;
                loadingProgress = (loadedCount / imagesToLoad);

                // GSAP timeline for our progress bar
                TweenLite.to(progressTl, 0.7, {
                    progress: loadingProgress,
                    ease: Linear.easeNone
                });
            }
            //progress animation instance. the instance's time is irrelevant, can be anything but 0 to void  immediate render
            var progressTl = new TimelineMax({
                paused: true,
                onUpdate: progressUpdate,
                onComplete: loadComplete
            });

            progressTl
            //tween the progress bar width
                .to($('#precargador .cont .barra'), 1, {
                width: "100%",
                ease: Linear.easeNone
            });

            //as the progress bar witdh updates and grows we put the precentage loaded in the screen
            function progressUpdate() {
                //the percentage loaded based on the tween's progress
                loadingProgress = Math.round(progressTl.progress() * 100);

            }

            function loadComplete() {

                // preloader out
                var preloaderOutTl = new TimelineMax();

                preloaderOutTl
                    .to($('#precargador .cont .barra'), 0.5, {
                        width: 0,
                        left: "auto",
                        right: 0,
                        ease: Back.easeIn

                    })
                    .to($('#precargador h4'), 0.4, {
                        y: 100,
                        opacity: 0,
                        ease: Power1.easeOut,
                        onComplete: fadeOutPreloader

                    }, "+=0.3");

                return preloaderOutTl;

            }

            function fadeOutPreloader() {
                init();
                TweenMax.to("#precargador", 0.3, {
                    autoAlpha: 0,
                    delay: 0.3

                });
            }


            function init() {

                ///////////////////
                ///////////////////
                ///// GENERAL /////
                ///////////////////
                ///////////////////

                // DEPTHY


                mainFactory.viewer().setImage('img/jose-portrait.jpg');
                mainFactory.viewer().setDepthmap('img/jose-portrait-depth.jpg');
                mainFactory.viewer().setOptions({});

                // Only if not IE, not touch, and not mobile
                var useScrollMagic = mainFactory.useScrollMagic();

                // SMOOTH SCROLL

                var $window = $(window);
                var scrollTime = 0.6;
                var scrollTime = 0.6;
                var scrollDistance = 130;

                $window.on("mousewheel DOMMouseScroll", function(event) {
                    var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
                    var notTouchPad = (delta <= -1 || delta >= 1);
                    if (notTouchPad && mainFactory.BrowserDetect().browser == "Chrome" && !mainFactory.is_windows()) {
                        event.preventDefault();
                        var scrollTop = $window.scrollTop();
                        var finalScroll = scrollTop - parseInt(delta * scrollDistance);
                        TweenMax.to($window, scrollTime, {
                            scrollTo: {
                                y: finalScroll,
                                autoKill: true
                            },
                            ease: Power1.easeOut,
                            overwrite: 5
                        });
                    }

                });


                // FLECHA SUBIR

                var flechaBaseSubir = $("#flechaBase"),
                    flechaPuntaIzq = $("#flechaPuntaIzq"),
                    flechaPuntaDer = $("#flechaPuntaDer"),
                    flechaSubeTL = new TimelineMax();
                if (useScrollMagic) {
                    // Flecha recogida
                    TweenLite.set(flechaPuntaDer, {
                        attr: {
                            d: 'M7.5,0.5 L7.5,0.5'
                        }
                    });
                    TweenLite.set(flechaPuntaIzq, {
                        attr: {
                            d: 'M7.5,1.5 L7.5,1.5'
                        }
                    });
                    TweenLite.set(flechaBaseSubir, {
                        attr: {
                            d: 'M7.5,0.5 L7.5,0.5'
                        }
                    });
                } else {
                    // Flecha abierta
                    TweenLite.set(flechaPuntaDer, {
                        attr: {
                            d: 'M7.5,0.5 L14.0192022,7.01920223'
                        }
                    });
                    TweenLite.set(flechaPuntaIzq, {
                        attr: {
                            d: 'M7.5,0.5 L0.980797589,7.01920223'
                        }
                    });
                    TweenLite.set(flechaBaseSubir, {
                        attr: {
                            d: 'M7.5,0.5 L7.5,20'
                        }
                    });
                }

                $("html.no-touchevents #flechaSubir").mouseenter(function() {
                    flechaSubeTL
                        .fromTo(flechaBaseSubir, 0.15, {
                            attr: {
                                d: 'M7.5,260 L7.5,260'
                            }
                        }, {
                            attr: {
                                d: 'M7.5,0.5 L7.5,260'
                            },
                            ease: Power3.easeOut
                        })
                        .to(flechaBaseSubir, 0.15, {
                            attr: {
                                d: 'M7.5,0.5 L7.5,20'
                            },
                            ease: Power3.easeOut
                        })
                        .fromTo(flechaPuntaDer, 0.2, {
                            attr: {
                                d: 'M7.5,0.5 L7.5,1.5'
                            }
                        }, {
                            attr: {
                                d: 'M7.5,0.5 L14.0192022,7.01920223'
                            },
                            ease: Power3.easeOut
                        }, "-=0.1")
                        .fromTo(flechaPuntaIzq, 0.2, {
                            attr: {
                                d: 'M7.5,1.5 L7.5,1.5'
                            }
                        }, {
                            attr: {
                                d: 'M7.5,0.5 L0.980797589,7.01920223'
                            },
                            ease: Power3.easeOut
                        }, "-=0.2");

                }).mouseleave(function() {
                    flechaSubeTL
                        .to(flechaPuntaDer, 0.15, {
                            attr: {
                                d: 'M7.5,0.5 L7.5,0.5'
                            },
                            ease: Power3.easeOut
                        })
                        .to(flechaPuntaIzq, 0.15, {
                            attr: {
                                d: 'M7.5,1.5 L7.5,1.5'
                            },
                            ease: Power3.easeOut
                        }, "-=0.15")
                        .to(flechaBaseSubir, 0.15, {
                            attr: {
                                d: 'M7.5,0.5 L7.5,0.5'
                            },
                            ease: Power3.easeOut
                        });
                });

                // MENU PROYECTOS


                TweenMax.set($('#menuProyectos'), {
                    autoAlpha: 0
                });

                $("#menuAllProjects h4").click(function() {
                    mainFactory.setMenuAbierto(true);


                    TweenMax.set("#menuProyectos .fondoMenuImgs img", {
                        autoAlpha: 0,
                        scale: 1
                    });

                    TweenMax.set("#menuProyectos ul, #closeSVG", {
                        autoAlpha: 1
                    });

                    TweenMax.fromTo("#menuProyectos", 0.8, {
                        scale: 1.2,
                        autoAlpha: 0,
                        delay: 0
                    }, {
                        autoAlpha: 1,
                        scale: 1,
                        delay: 0,
                        ease: Power3.easeOut
                    });
                    var menuItems = new TimelineMax();
                    // TODO staggle? para que sean todos los li y no uno a uno
                    menuItems
                        .fromTo($('#menuProyectos ul li:nth-child(1)'), 0.3, {
                            opacity: '0',
                            y: 90
                        }, {
                            opacity: '1',
                            y: 0,
                            clearProps: "y",
                            ease: Power2.easeOut
                        }, 0)
                        .fromTo($('#menuProyectos ul li:nth-child(2)'), 0.3, {
                            opacity: '0',
                            y: 90
                        }, {
                            opacity: '1',
                            y: 0,
                            clearProps: "y",
                            ease: Power2.easeOut
                        }, 0.04)
                        .fromTo($('#menuProyectos ul li:nth-child(3)'), 0.3, {
                            opacity: '0',
                            y: 90
                        }, {
                            opacity: '1',
                            y: 0,
                            clearProps: "y",
                            ease: Power2.easeOut
                        }, 0.08)
                        .fromTo($('#menuProyectos ul li:nth-child(4)'), 0.3, {
                            opacity: '0',
                            y: 90
                        }, {
                            opacity: '1',
                            y: 0,
                            clearProps: "y",
                            ease: Power2.easeOut
                        }, 0.12)
                        .fromTo($('#menuProyectos ul li:nth-child(5)'), 0.3, {
                            opacity: '0',
                            y: 90,
                        }, {
                            opacity: '1',
                            y: 0,
                            clearProps: "y",
                            ease: Power2.easeOut
                        }, 0.16);
                })
                var lineaSeeAll = CSSRulePlugin.getRule("#menuAllProjects h4:before");
                $("html.no-touchevents #menuAllProjects h4").mouseenter(function() {
                    TweenLite.to(lineaSeeAll, 0.2, {
                        width: "200px",
                        ease: Power2.easeOut
                    });
                }).mouseleave(function() {
                    TweenLite.to(lineaSeeAll, 0.2, {
                        width: "100px",
                        ease: Power2.easeOut
                    });
                });


                var itemsMenuProyectos = $("#menuProyectos ul li");
                var proyectoHover;
                var fondoProyectoActivo;
                var indiceZ = 1;
                TweenLite.set("#menuProyectos .fondoMenuImgs img", {
                    autoAlpha: 0
                });
                var fondosMenuTL;
                var lineaTL;
                itemsMenuProyectos.mouseenter(function() {
                    proyectoHover = $(this).find("a").attr('data-image');
                    fondoProyectoActivo = $("#menuProyectos .fondoMenuImgs").find("img[data-image='" + proyectoHover + "']");

                    TweenLite.to(itemsMenuProyectos, 0.2, {
                        opacity: '0.5'
                    });
                    TweenLite.to(this, 0.1, {
                        opacity: '1'
                    });

                    if (!$(this).hasClass("active")) {
                        lineaTL = new TimelineMax();


                        lineaTL
                            .fromTo($(this).find(".barra"), 0.15, {
                                width: '0%',
                                left: '0%',
                                right: 'auto'
                            }, {
                                width: '100%',
                                left: '0%',
                                right: 'auto'
                            })
                            .to($(this).find(".barra"), 0.15, {
                                width: '0%',
                                right: '0%',
                                left: 'auto'
                            });


                    }



                    indiceZ++;
                    TweenLite.set(fondoProyectoActivo, {
                        css: {
                            zIndex: indiceZ
                        }
                    });

                    fondosMenuTL = new TimelineMax();
                    fondosMenuTL
                        .fromTo(fondoProyectoActivo, 3, {
                            scale: 1.1,
                        }, {
                            scale: 1,
                            ease: Power2.easeOut
                        }, 0)
                        .fromTo(fondoProyectoActivo, 0.7, {
                            autoAlpha: 0
                        }, {
                            autoAlpha: 1
                        }, 0);

                }).mouseleave(function() {
                    TweenLite.to(itemsMenuProyectos, 0.2, {
                        opacity: '1'
                    });
                    if ($(this).hasClass("active")) {
                        if (useScrollMagic) {
                            TweenLite.fromTo($(this).find(".barra"), 0.15, {
                                width: '0%',
                                left: '0%',
                                right: 'auto'
                            }, {
                                width: '100%',
                                left: '0%',
                                right: 'auto'
                            });
                        } else {
                            TweenLite.fromTo($(this).find(".barra"), 0.15, {
                                width: '0%',
                                left: '0%',
                                right: 'auto'
                            }, {
                                width: '93%',
                                left: '50%',
                                right: 'auto'
                            });
                        }

                    }

                });

                $("html.no-touchevents #menuProyectos ul").mouseleave(function() {
                    if (!mainFactory.getCargandoDesdeMenu()) {
                        TweenLite.to($("#menuProyectos .fondoMenuImgs img"), 0.3, {
                            autoAlpha: 0
                        });
                    }

                });

                var urlDestino;
                itemsMenuProyectos.click(function(e) {
                    e.stopPropagation();
                    if (!mainFactory.getCargandoDesdeMenu() && !$(this).hasClass("active")) {

                        mainFactory.setCargandoDesdeMenu(true);
                        urlDestino = $(this).find("a").attr("data-image");
                        // Barra activa
                        TweenLite.to(itemsMenuProyectos.find(".barra"), 0.3, {
                            width: '0%',
                            left: '0%',
                            right: 'auto'

                        });
                        itemsMenuProyectos.removeClass("active");
                        $(this).addClass("active");
                        //TODO mobile
                        if (useScrollMagic) {
                            TweenLite.fromTo($(this).find(".barra"), 0.15, {
                                width: '0%',
                                left: '0%',
                                right: 'auto'
                            }, {
                                width: '100%',
                                left: '0%',
                                right: 'auto'
                            });
                        } else {

                            TweenLite.fromTo($(this).find(".barra"), 0.15, {
                                width: '0%',
                                left: '50%',
                                right: 'auto'
                            }, {
                                width: '93%',
                                left: '50%',
                                right: 'auto'
                            });
                        }

                        //
                        TweenLite.to(fondosMenuTL, 0.5, {
                            timeScale: 4,
                            ease: Expo.easeOut
                        });
                        // TODO error
                        TweenMax.to("#menuProyectos ul, #closeSVG", 0.3, {
                            autoAlpha: 0,
                            onComplete: cargaApartado
                        });
                    }
                });

                function cargaApartado() {
                    TweenMax.killTweensOf("#menuProyectos ul, #closeSVG");
                    $rootScope.$apply(function() {
                        $location.path("/" + urlDestino);
                    });
                }


                $("#menuProyectos").click(function() {

                    if (!mainFactory.getCargandoDesdeMenu()) {
                        TweenMax.to("#menuProyectos", 0.5, {
                            ease: Power3.easeOut,
                            autoAlpha: 0
                        });
                    }
                });

                $("html.no-touchevents #closeSVG").mouseenter(function() {
                    TweenMax.to(this, 0.3, {
                        opacity: 1,
                        ease: Power3.easeOut
                    });
                }).mouseleave(function() {
                    TweenMax.to(this, 0.3, {
                        opacity: 0.7,
                        ease: Power3.easeOut
                    });
                });

                var lineaNectProject = CSSRulePlugin.getRule("#bloque-fin-proyecto h3:before");
                var anchoLinea;
                //mainFactory.setAbriendoApartado(false);
                $("html.no-touchevents .next-project-btn").mouseenter(function() {
                    anchoLinea = $("#bloque-fin-proyecto h3 a").width() + 85;
                    TweenMax.to(lineaNectProject, 0.3, {
                        width: anchoLinea + "px",
                        backgroundColor: "#fff",
                        ease: Power3.easeOut
                    });
                    TweenMax.to("#bloque-fin-proyecto h5", 0.5, {
                        color: "#fff",
                        ease: Power3.easeOut
                    });
                    TweenMax.to("#bloque-fin-proyecto .img-fondo-proyecto", 0.5, {
                        opacity: 0.75
                    });
                    TweenMax.fromTo("#bloque-fin-proyecto .img-fondo-proyecto", 9, {
                        scale: 1.2
                    }, {
                        scale: 1,
                        ease: Expo.easeOut
                    });
                }).mouseleave(function() {
                    if (!mainFactory.getAbriendoApartado()) {
                        TweenMax.to(lineaNectProject, 0.5, {
                            backgroundColor: "#8E8E8E",
                            width: "30px",
                            ease: Expo.easeOut
                        });

                        TweenMax.to("#bloque-fin-proyecto h5", 0.5, {
                            color: "#8E8E8E",
                            ease: Power3.easeOut
                        });
                        TweenMax.to("#bloque-fin-proyecto .img-fondo-proyecto", 0.3, {
                            opacity: 0
                        });
                    } else {
                        TweenMax.to(lineaNectProject, 0.3, {
                            width: "0px",
                            ease: Power3.easeOut
                        });
                    }
                });

                $(".next-project-btn").click(function(e) {
                    e.preventDefault();
                    mainFactory.setAbriendoApartado(true);
                    TweenMax.set("#bloque-fin-proyecto", {
                        zIndex: "9998"
                    });
                    TweenMax.to("#bloque-fin-proyecto .img-fondo-proyecto", 0.3, {
                        opacity: 1
                    });
                    TweenMax.to("#bloque-fin-proyecto h5,#bloque-fin-proyecto h3", 0.3, {
                        opacity: 0
                    });
                    TweenMax.to(lineaNectProject, 0.3, {
                        width: "0px",
                        ease: Power3.easeOut
                    });
                    TweenMax.to("#bloque-fin-proyecto .img-fondo-proyecto", 0.3, {
                        scale: 1,
                        ease: Expo.easeOut
                    });

                    TweenMax.to("#bloque-fin-proyecto", 1, {
                        height: "100%",
                        ease: Expo.easeOut,
                        onComplete: nextProject
                    });

                    // MENU Active state
                    // Barra activa
                    TweenLite.to(itemsMenuProyectos.find(".barra"), 0.3, {
                        width: '0%',
                        left: '0%',
                        right: 'auto'

                    });
                    itemsMenuProyectos.removeClass("active");
                    var activo = $("#menuProyectos ul li").find("[data-image='" + mainFactory.getUrlNextProject() + "']").closest("li");
                    activo.addClass("active");
                    TweenLite.fromTo(activo.find(".barra"), 0.15, {
                        width: '0%',
                        left: '0%',
                        right: 'auto'
                    }, {
                        width: '100%',
                        left: '0%',
                        right: 'auto'
                    });
                    //

                });


                function nextProject() {

                    mainFactory.setMenuAbierto(true);
                    $rootScope.$apply(function() {
                        $location.path("/" + mainFactory.getUrlNextProject());
                    });


                }

                // RESPONSIVE

                $(window).resize(function() {
                    // console.log($(window).width());
                    if ($.isXs()) {
                        mainFactory.viewer().setOptions({
                            size: {
                                width: 500,
                                height: 550
                            }
                        });

                    } else if ($.isSm()) {
                        mainFactory.viewer().setOptions({
                            size: {
                                width: 650,
                                height: 700
                            }
                        });

                    } else if ($.isMd()) {
                        mainFactory.viewer().setOptions({
                            size: {
                                width: 900,
                                height: 800
                            }
                        });

                    } else if ($.isLg()) {

                        mainFactory.viewer().setOptions({
                            size: {
                                width: 900,
                                height: 800
                            }
                        });



                    }

                    if ($(window).width() > 1400) {

                        mainFactory.viewer().setOptions({
                            size: {
                                width: 900,
                                height: 1000
                            }
                        });

                    }

                }).resize();


                ///////////////////////////
                ///////////////////////////
                ///// INTRO ANiMATION /////
                ///////////////////////////
                ///////////////////////////




                TweenMax.fromTo(".claim h1", 1, {
                    y: "+=100",
                    opacity: "0"
                }, {
                    y: "0",
                    opacity: "1",
                    ease: Expo.easeOut,
                    delay: 0.3
                });
                TweenMax.fromTo(".claim h2", 1, {
                    y: "+=100",
                    opacity: "0"
                }, {
                    y: "0",
                    opacity: "1",
                    ease: Expo.easeOut,
                    delay: 0.6
                });
                TweenMax.fromTo("#intro #lol", 10, {
                    scale: 2
                }, {
                    scale: 1.1,
                    ease: Expo.easeOut,
                    delay: 0.3
                });
                TweenMax.fromTo("#intro #lol", 3, {
                    opacity: "0"
                }, {
                    opacity: "1",
                    delay: 0.6
                });
                TweenMax.to(".flechaSVG svg", 1, {
                    x: "-=50",
                    ease: Expo.easeOut,
                    delay: 0.3
                });
                // About Me btn
                // MouseOver
                // Click
                var linea1Animada = false;
                var linea2Animada = false;
                var aboutMeOpened = false;
                var linea1 = new TimelineMax({
                    paused: true,
                    smoothChildTiming: true,
                    onStart: function() {
                        linea1Animada = true;
                    },
                    onComplete: function() {
                        linea1Animada = false;
                    },
                    onReverseComplete: function() {
                        linea1Animada = false;
                    }
                });
                var linea2 = new TimelineMax({
                    paused: true,
                    smoothChildTiming: true,
                    onStart: function() {
                        linea2Animada = true;
                    },
                    onComplete: function() {
                        linea2Animada = false;
                    },
                    onReverseComplete: function() {
                        linea2Animada = false;
                    }
                });
                linea1
                    .fromTo("#lineaCerrar1", 0.25, {
                        top: 0,
                        bottom: "auto",
                        height: 50
                    }, {
                        height: "50vh",
                        ease: Power3.easeOut,
                        delay: 0
                    })
                    .set("#lineaCerrar1", {
                        top: "auto",
                        bottom: "50vh"
                    })
                    .to("#lineaCerrar1", 0.25, {
                        top: "auto",
                        bottom: "50vh",
                        height: 0,
                        delay: 0
                    });
                linea2
                    .fromTo("#lineaCerrar2", 0.25, {
                        top: "auto",
                        bottom: 0,
                        height: 50

                    }, {
                        height: "50vh",
                        ease: Power3.easeOut,
                        delay: 0

                    })
                    .set("#lineaCerrar2", {
                        bottom: "auto",
                        top: "50vh",
                    })
                    .to("#lineaCerrar2", 0.25, {
                        bottom: "auto",
                        top: "50vh",
                        height: 0,
                        delay: 0
                    });


                var blurElement = {
                    a: 0
                }; //start the blur at 0 pixels
                TweenMax.set(".aboutMeInfo", {
                    autoAlpha: 0
                });

                TweenMax.set("#intro", {
                    css: {
                        perspective: 600
                    }
                });
                TweenMax.set("#closeAboutSVG", {
                    autoAlpha: 0
                });


                $("#intro .aboutMeBtn a, #closeAboutSVG").click(function(e) {
                    e.preventDefault();
                    // Cerrando
                    if (!linea1Animada) {
                        if (aboutMeOpened && !linea1Animada) {
                            linea1Animada = true;
                            linea2Animada = true;
                            TweenMax.to("#closeAboutSVG", 0.3, {
                                scale: 0,
                                autoAlpha: 0,
                                delay: 0,
                                ease: Power3.easeOut,
                                onComplete: function() {
                                    linea1.reverse();
                                    linea2.reverse();
                                }
                            });
                            TweenMax.to("#intro .aboutMeBtn, #intro .scrollDown", 0.3, {
                                autoAlpha: 1,
                                delay: 0.2
                            });
                            TweenMax.to(".introContent", 0.7, {
                                scaleX: 1,
                                scaleY: 1,
                                autoAlpha: 1,
                                ease: Power3.easeOut,
                                delay: 0.3
                            });
                            if (useScrollMagic) {
                                TweenMax.to(blurElement, 0.5, {
                                    a: 0,
                                    onUpdate: applyBlur,
                                    delay: 0.5
                                });
                            }
                            TweenMax.to("#intro #lol", 1, {
                                scale: 1.1,
                                ease: Power3.easeOut,
                                delay: 0
                            });
                            TweenMax.fromTo(".aboutMeInfo", 0.5, {
                                scale: 1,
                                delay: 0
                            }, {
                                autoAlpha: 0,
                                scaleX: 1.2,
                                scaleY: 1.2,
                                delay: 0,
                                display: "none",
                                ease: Power3.easeOut
                            });
                            // Abriendo
                        } else if (!aboutMeOpened && !linea1Animada) {
                            linea1Animada = true;
                            linea2Animada = true;
                            TweenLite.set("#lineaCerrar1", {
                                height: 50,
                                top: 0,
                                bottom: "auto"
                            });
                            TweenLite.set("#lineaCerrar2", {
                                height: 50,
                                top: "auto",
                                bottom: 0
                            });

                            linea1.play();
                            linea2.play();
                            TweenMax.to("#intro .aboutMeBtn, #intro .scrollDown", 0.3, {
                                autoAlpha: 0,
                                delay: 0.2
                            });
                            TweenMax.fromTo("#closeAboutSVG", 0.3, {
                                scale: 0
                            }, {
                                autoAlpha: 0.5,
                                scale: 1,
                                delay: 0.45,
                                ease: Power3.easeOut
                            });
                            TweenMax.to(".introContent", 0.7, {
                                scaleX: 0.8,
                                scaleY: 0.8,
                                autoAlpha: 0,
                                delay: 0
                            }, {
                                autoAlpha: 1,
                                scaleX: 1,
                                scaleY: 1,
                                delay: 0,
                                ease: Power3.easeOut
                            });
                            if (useScrollMagic) {
                                TweenMax.to(blurElement, 0.5, {
                                    a: 8,
                                    onUpdate: applyBlur,
                                    delay: 0.5
                                });
                            }
                            TweenMax.to("#intro #lol", 1, {
                                scale: 1,

                                ease: Power3.easeOut,
                                delay: 0
                            });
                            TweenMax.fromTo(".aboutMeInfo", 0.5, {
                                scaleX: 1.2,
                                scaleY: 1.2,
                                delay: 0
                            }, {
                                autoAlpha: 1,
                                scale: 1,
                                delay: 0.3,
                                display: "block",
                                ease: Power3.easeOut,
                                clearProps: "scale"

                            });
                        }
                        aboutMeOpened = !aboutMeOpened;
                    }
                });

                var animaLinea1;
                var animaLinea2;

                $("html.no-touchevents #intro .aboutMeBtn a").mouseenter(function() {
                    if (!linea1Animada) {
                        var ancho = $(this).innerWidth();
                        animaLinea1 = TweenLite.to("#lineaCerrar1", 0.2, {
                            height: ancho + 80

                        });
                    }
                }).mouseleave(function() {
                    if (!linea1Animada) {
                        if (!aboutMeOpened) {
                            TweenLite.to("#lineaCerrar1", 0.2, {
                                height: 50

                            });
                        }
                    }
                });

                $("html.no-touchevents #intro .scrollDown a").mouseenter(function() {
                    if (!linea1Animada) {
                        var ancho = $(this).innerWidth();
                        animaLinea2 = TweenLite.to("#lineaCerrar2", 0.2, {
                            height: ancho + 80

                        });
                    }
                }).mouseleave(function() {
                    if (!linea1Animada) {
                        if (!aboutMeOpened) {
                            TweenLite.to("#lineaCerrar2", 0.2, {
                                height: 50

                            });
                        }
                    }
                });

                $("html.no-touchevents #closeAboutSVG").mouseenter(function() {
                    TweenLite.to(this, 0.2, {
                        autoAlpha: 1
                    });
                }).mouseleave(function() {
                    TweenLite.to(this, 0.2, {
                        autoAlpha: 0.5
                    });
                });

                //here you pass the filter to the DOM element
                function applyBlur() {
                    TweenMax.set($('#lol'), {
                        webkitFilter: "blur(" + blurElement.a + "px)"
                    });
                };
            }
            ////////////////
        });
    }]);

}(window.angular));