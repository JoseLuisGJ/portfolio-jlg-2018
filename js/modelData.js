(function(angular) {
    'use strict';

    angular.module('myApp.modelData', [])

    .filter("htmlSafe", ['$sce', function($sce) {
        return function(htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
    }])

    .config(['$locationProvider', '$routeProvider', '$translateProvider', '$windowProvider', function($locationProvider, $routeProvider, $translateProvider, $windowProvider) {


        $translateProvider.translations('en', {
            'SALUDO': 'Hello World',
            'SOY': "I'm",
            'TODOS': 'All projects',
            'SCROLL': 'Scroll down',
            'PROX-PROYECTO': 'See next project',
            'ABOUT-TITULO': 'About Me',
            'ABOUT-CONT-1': 'I have 18 years professional experience, based in Valencia I have developed projects for clients such as <b>Energy System, Amstel, Lois Jeans, Grefusa, Avantio, Global Omnium, GoAigua or Qatium</b> among others.',
            'ABOUT-CONT-2': 'I was cofounder of <a class="hoverLinea" href="http://nectarestudio.com" target="_blank">Nectar Estudio</a> in 2004 to 2012. I have continued to doing management and productions tasks for studios and agencies as <a class="hoverLinea" href="http://publips-serviceplan.es/" target="_blank">Publips</a> and <a class="hoverLinea" href="http://www.shackletongroup.com/" target="_blank">Shackleton Digital</a>. I have received awards and recognitions from <a class="hoverLinea" href="http://www.awwwards.com" target="_blank">AWWWARDS</a>, <a class="hoverLinea" href="https://thefwa.com/" target="_blank">FWA</a>, <a class="hoverLinea" href="http://www.premiosadcv.com/" target="_blank">ADCV</a> and <a class="hoverLinea" href="http://www.festivallalluna.com/" target="_blank">La Lluna</a>.',
            'ABOUT-CONT-3': 'Teaching was part of my career. I led the <a class="hoverLinea" href="http://www.esat.es/estudios/curso-avanzado-de-diseno-web-y-programacion/?pnt=2900" target="_blank">ID3 post degree</a> in ESAT Valencia. Where I also taught UX//UI and web Frontend development in the New Media Arts 2.0 degree.',
            'ABOUT-CONT-4': 'Currently I work as a Senior Product Designer at <a class="hoverLinea" href="http://www.newrelic.com" target="_blank">New Relic</a>, making a better internet for love of software!',
            'ROLE': 'Role',
            'CLIENTE': 'Client',
            // AGUAS DE VALENCIA
            'P1.TITULO': 'Web, APP & interactives',
            'P1.SUBTITULO': 'Grupo Aguas de Valencia',
            'P1.ROLE1': 'UX/UI & Product Designer',
            'P1.ROLE2': 'Frontend Developer',
            'P1.CLIENTE': 'Grupo Aguas de Valencia',
            'P1.TEXTO-1': 'Web',
            'P1.TEXTO-2': 'APP',
            'P1.TEXTO-3': 'Infographics',
            'P1.TITULO-1': 'Corporate Web & Virtual Office',
            'P1.CONT-1-1': 'Aguas de Valencia group renews in 2015 their corporate identity and at the same time all their digital channels as website, virtual office and launches mobile APP management to facilitate clients with their connected services',
            'P1.CONT-1-2': 'It is a unified platform where to access corporate information and client services focusing on user experience and usability using the latest technology.',
            'P1.TITULO-2': 'Mobile APP',
            'P1.CONT-2': 'APP is launched for the two main platforms IOS and Android. Users can make enquiries and manage their accounts comfortably adapting the user experience to mobile context.',
            'P1.TITULO-3': 'Interactives',
            'P1.CONT-3': 'To conmemorate the 125th anniversary of the Group an exhibition is available explaining the history and services provided by the group. Among other pieces there are displayed several interactives where user can learn more about the evolution of the remote reading service in Valencia city among others.',
            'P1.TITULO-4': 'Data visualization',
            'P1.CONT-4': 'Design and development of different products for data visualization monitoring and decisions in real time: Dashboards and GIS systems connected with ReactJS',
            // ENERGY SYSTEM
            'P2.TITULO': 'Promotional Web',
            'P2.SUBTITULO': 'Energy System',
            'P2.ROLE1': 'Frontend Developer',
            'P2.CLIENTE': 'Publips Serviceplan',
            'P2.TEXTO-1': 'Web',
            'P2.TEXTO-2': 'Responsive',
            'P2.TEXTO-3': 'Facebook Campaign',
            'P2.TITULO-1': 'Web',
            'P2.CONT-1-1': 'Energy System breaks in to the mobile market with 3 really poweful devices. The spanish brand creates a promotional website showing the stories of 3 spaniards working abroad doing incredible things.',
            'P2.CONT-1-2': 'The website focuses on the user experience and advanced microinteractions to promote this new technology and dynamism that conveys the brand with its new product.',
            'P2.TITULO-2': 'Facebook Campaign',
            'P2.CONT-2': 'As part of the promotion a contest was launched where users can propose an incredible friend via Facebook, opting to win one of the brand´s new devices.',
            // ZEENDO
            'P3.TITULO': 'Theme template',
            'P3.SUBTITULO': 'Zeendo',
            'P3.ROLE1': 'UI Design',
            'P3.CLIENTE': 'Zeendo',
            'P3.TEXTO-1': 'UI Design',
            'P3.TEXTO-2': 'Responsive Design',
            'P3.TITULO-1': 'UI Design',
            'P3.CONT-1-1': 'Zeendo is a platform that offers high quality hosting and theme template services all in one. It has a control panel with an advanced level of customization and it is intuitive for users without knowledge.',
            'P3.CONT-1-2': 'For this project a new Theme was created based on Flat Design, completely modular and adaptable which has several components such as photo gallery, team members, sliders, news...',
            'P3.TITULO-2': 'Responsive Design',
            'P3.CONT-2': 'Entire interface and components are embedded in the owner´s grid system platform, contemplating breaking points for the appropriate responsive design.',
            // MUCHOSOL
            'P4.TITULO': 'Product Design',
            'P4.SUBTITULO': 'Muchosol',
            'P4.ROLE1': 'UX/UI & Product Designer',
            'P4.CLIENTE': 'Avantio',
            'P4.TEXTO-1': 'UX / UI Design',
            'P4.TEXTO-2': 'Responsive Design',
            'P4.TITULO-1': 'UX Audit & UI Design',
            'P4.CONT-1-1': 'Muchosol is a Company leading in rental  of apartments, villas and holiday homes and specialiced in sun and beach destinations. In a new phase of expansion the interface was redesigned, improving the user experience and conversion of contracted services.',
            'P4.CONT-1-2': 'This platform has many service facilities, providers, destinations and information displayed in a user friendly way guiding the user easily to use any of the services available.',
            'P4.TITULO-2': 'Responsive Design',
            'P4.CONT-2': 'This platform must be accessible from anywhere and at anytime including holiday areas and required a large study of adaptation to Responsive Design.'

        });

        $translateProvider.translations('es', {
            // GENERAL
            'SALUDO': 'Hola Mundo',
            'SOY': 'Soy',
            'TODOS': 'Proyectos',
            'SCROLL': 'Scroll Down',
            'PROX-PROYECTO': 'Próximo proyecto',
            'ABOUT-TITULO': 'Sobre mi',
            'ABOUT-CONT-1': 'Profesional del sector desde hace 18 años y asentado en Valencia he realizado proyectos para cliente como <b>Energy System, Amstel, Lois Jeans, Grefusa, Avantio, Global Omnium, GoAigua y Qatium</b> entre otros.',
            'ABOUT-CONT-2': 'Tras cofundar <a class="hoverLinea" href="http://nectarestudio.com" target="_blank">Nectar Estudio</a> de 2004 a 2012, he seguido realizando tareas de dirección y producción para estudios y agencias como <a class="hoverLinea" href="http://publips-serviceplan.es/" target="_blank">Publips</a>, <a class="hoverLinea" href="http://www.shackletongroup.com/" target="_blank">Shackleton Digital</a> donde obtuve algunos premios y reconocimientos como <a class="hoverLinea" href="http://www.awwwards.com" target="_blank">AWWWARDS</a>, <a class="hoverLinea" href="https://thefwa.com/" target="_blank">FWA</a>, <a class="hoverLinea" href="http://www.premiosadcv.com/" target="_blank">ADCV</a> y <a class="hoverLinea" href="http://www.festivallalluna.com/" target="_blank">La Lluna</a>.',
            'ABOUT-CONT-3': 'La docencia fué parte de mi profesión, dirijiendo el <a class="hoverLinea" href="http://www.esat.es/estudios/curso-avanzado-de-diseno-web-y-programacion/?pnt=2900" target="_blank">Postgrado ID3</a> en ESAT Valencia. Dónde también impartí clases en la carrera de New Media Arts 2.0 de UX / UI y desarrollo web Frontend.',
            'ABOUT-CONT-4': 'Actualmente trabajo como Senior Product Designer en <a class="hoverLinea" href="http://www.newrelic.com" target="_blank">New Relic</a>, haciendo un interner mejor, por el amor del software!',
            'ROLE': 'Role',
            'CLIENTE': 'Cliente',
            // AGUAS DE VALENCIA
            'P1.TITULO': 'Web, APP & Infografías interactivas',
            'P1.SUBTITULO': 'Grupo Aguas de Valencia',
            'P1.ROLE1': 'UX/UI & Product Designer',
            'P1.ROLE2': 'Frontend Developer',
            'P1.CLIENTE': 'Grupo Aguas de Valencia',
            'P1.TEXTO-1': 'Web',
            'P1.TEXTO-2': 'APP',
            'P1.TEXTO-3': 'Infografías',
            'P1.TITULO-1': 'Web corporativa & Oficina Virtual',
            'P1.CONT-1-1': 'El Grupo Aguas de Valencia renueva en 2015 su identidad corporativa y a su vez todos sus canales digitales como son su página web, oficina virtual y lanza una APP móvil para facilitar la gestión de los clientes con sus servicios contratados.',
            'P1.CONT-1-2': 'Se trata de una plataforma unificada donde poder consultar información corporativa y servicios a clientes haciendo especial esfuerzo en la experiencia de usuario y facilidad de uso utilizando la última tecnología.',
            'P1.TITULO-2': 'APP Móvil',
            'P1.CONT-2': 'Se lanza una APP para las dos principales plataformas iOS y Android donde los los usuarios pueden realizar consultas y gestiones sobre sus servicios contratados de forma más cómoda y con una experiencia adaptada al contexto móvil.',
            'P1.TITULO-3': 'Infografías interactivas',
            'P1.CONT-3': 'Con motivo del 125 aniversario del grupo, se realiza una exposición donde se muestra la historia y los servicios prestados por el grupo. Entre otras piezas se realizan varias infografías con pantallas táctiles donde el usuario puede interactuar y conocer más acerca de la evolución del servicio de telelectura en la ciudad de Valencia entre otros.',
            'P1.TITULO-4': 'Monitorización de información',
            'P1.CONT-4': 'Diseño y desarrollo  de diferentes productos para la monitorización de información y toma de decisiones en tiempo real: Dashboards y sistemas GIS conectados con ReactJS',
            // ENERGY SYSTEM
            'P2.TITULO': 'Web promocional',
            'P2.SUBTITULO': 'Energy System',
            'P2.ROLE1': 'Frontend Developer',
            'P2.CLIENTE': 'Publips Serviceplan',
            'P2.TEXTO-1': 'Web',
            'P2.TEXTO-2': 'Responsive',
            'P2.TEXTO-3': 'Campaña Facebook',
            'P2.TITULO-1': 'Web',
            'P2.CONT-1-1': 'Energy System irrumpe en el mercado móvil con 3 modelos realmente potentes. Para ello la marca española decide crear una web promocional donde se muestran 3 historias vividas por 3 españoles que trabajan en el extranjero haciendo cosas increíbles.',
            'P2.CONT-1-2': 'La web se centra en la experiencia de usuario y microinteracciones avanzadas para transmitir esa nueva tecnología y dinamismo que transmite la marca con su nuevo producto.',
            'P2.TITULO-2': 'Campaña Facebook',
            'P2.CONT-2': 'Como parte de la promoción, se lanza un concurso donde los usuario pueden proponer a un amigo/a increíble mediante Facebook, optando a ganar uno de los nuevos móviles de la marca.',
            // ZEENDO
            'P3.TITULO': 'Theme template',
            'P3.SUBTITULO': 'Zeendo',
            'P3.ROLE1': 'UI Design',
            'P3.CLIENTE': 'Zeendo',
            'P3.TEXTO-1': 'Diseño UI',
            'P3.TEXTO-2': 'Responsive Design',
            'P3.TITULO-1': 'Diseño UI',
            'P3.CONT-1-1': 'Zeendo es una plataforma que ofrece servicios de hosting y theme templates de alta calidad todo integrado. Cuenta con un Panel de Control con un nivel de personalización muy avanzado e intuitivo para usuarios sin ningún conocimiento de programación.',
            'P3.CONT-1-2': 'Para este proyecto se creó un nuevo Theme basado en la estética Flat Design, totalmente modular y adaptable, el cual cuenta con diferentes componentes como  galería de fotos, miembros del equipo, sliders, noticias...',
            'P3.TITULO-2': 'Responsive Design',
            'P3.CONT-2': 'Todo el interface y sus componentes están encajados en el sistema de retícula propietario de la plataforma. Contemplando los puntos de corte más comunes para una adaptación de tipo Responsive Design correcta.',
            // MUCHOSOL
            'P4.TITULO': 'Product Design',
            'P4.SUBTITULO': 'Muchosol',
            'P4.ROLE1': 'UX/UI & Product Designer',
            'P4.CLIENTE': 'Avantio',
            'P4.TEXTO-1': 'Diseño UX & UI',
            'P4.TEXTO-2': 'Responsive Design',
            'P4.TITULO-1': 'Auditoría UX & Diseño UI',
            'P4.CONT-1-1': 'Muchosol es una empresa líder en el sector de alquiler de apartamentos, villas y casas de vacaciones especializada en destinos de sol y playa. En una nueva fase de expansión se rediseñó su interface, mejorando la experiencia de usuario y conversión de servicios contratados.',
            'P4.CONT-1-2': 'Dicha plataforma cuenta con gran cantidad de servicios, proveedores, destinos e información que debe ser mostrada al usuario de la forma más clara posible. Guiándole de forma fácil en cualquier proceso que este desee hacer.',
            'P4.TITULO-2': 'Responsive Design',
            'P4.CONT-2': 'La plataforma ha de ser accesible desde cualquier lugar y en cualquier momento, su uso en zonas vacacionales hizo necesario un gran estudio de adaptación a Responsive Design.'

        });
        // Idioma según idioma por defecto del navegador
        var $window = $windowProvider.$get();
        var lang = $window.navigator.language || $window.navigator.userLanguage;
        if (lang.indexOf('es') !== -1) {
            $translateProvider.preferredLanguage('es');
        } else {
            $translateProvider.preferredLanguage('en');
        }
        // Forzar idioma a 'es' o 'en'
        //$translateProvider.preferredLanguage('en');
    }]);

}(window.angular));