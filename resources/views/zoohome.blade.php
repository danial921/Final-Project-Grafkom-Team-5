<html>

    <head>
        <title>ITS Zoo</title>

            <!-- Favicon -->
    <link href="img/favicon.ico" rel="icon">

    <!-- Google Web Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Icon Font Stylesheet -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">

    <!-- Libraries Stylesheet -->
    <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">
    <link href="lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />

    <!-- Customized Bootstrap Stylesheet -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Template Stylesheet -->
    <link href="css/style.css" rel="stylesheet">

        <script type="text/javascript" charset="UTF-8" src="lib/three/build/three.js"></script>
        <script type="text/javascript" charset="UTF-8" src="lib/three/examples/js/controls/FirstPersonControls.js"></script>
        <script type="text/javascript" charset="UTF-8" src="lib/three/examples/js/loaders/OBJLoader.js"></script>
        <script type="text/javascript" charset="UTF-8" src="lib/three/examples/js/loaders/GLTFLoader.js"></script>
        <script type="text/javascript" charset="UTF-8" src="lib/chroma.js"></script>
    
        <script type="text/javascript" src="lib/utils/Stats.js"></script>
        <script type="text/javascript" src="lib/utils/dat.gui.js"></script>
        <!-- <script type="text/javascript" src="lib/utils/three.min.js"></script> -->
        <script type="text/javascript" src="lib/THREE.GamepadControls.js"></script>
        <script type="text/javascript" charset="UTF-8" src="lib/three/examples/js/controls/PointerLockControls.js"></script>

        <script type="text/javascript" src="util_1.js"></script>
        <script type="text/javascript" src="util_2.js"></script>
        <script type="text/javascript" src="app.js"></script>
        <link rel="stylesheet" href="style.css">
    
        <style>
            body {
                /* set margin to 0 and overflow to hidden, to go fullscreen */
                margin: 0;
                overflow: hidden;
            }
        </style>
    </head>
    
    <body>
    <nav class="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                <a href="index.html" class="navbar-brand d-flex d-lg-none me-4">
                    <h2 class="text-primary mb-0"><i class="fa fa-hashtag"></i></h2>
                </a>
                <a href="#" class="sidebar-toggler flex-shrink-0">
                    <i class="fa fa-bars"></i>
                </a>
                <form class="d-none d-md-flex ms-4">
                    <input class="form-control border-0" type="search" placeholder="Search">
                </form>
                <div class="navbar-nav align-items-center ms-auto">
                    <div class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <img class="rounded-circle me-lg-2" src="img/user.jpg" alt="" style="width: 40px; height: 40px;">
                            <span class="d-none d-lg-inline-flex">Danial Farros</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                            <a href="#" class="dropdown-item">My Profile</a>
                            <a href="#" class="dropdown-item">Settings</a>
                            <a class="dropdown-item" href="{{ route('logout') }}"                                        onclick="event.preventDefault();
                                document.getElementById('logout-form').submit();">Log Out</a>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                @csrf
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
            
        <div id="webgl-output">
            <script type="text/javascript">
                (function () {
                    // your page initialization code here
                    // the DOM will be available here
                    init()
                })();
            </script>
        </div>
    </body>
        <!-- JavaScript Libraries -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="lib/chart/chart.min.js"></script>
    <script src="lib/easing/easing.min.js"></script>
    <script src="lib/waypoints/waypoints.min.js"></script>
    <script src="lib/owlcarousel/owl.carousel.min.js"></script>
    <script src="lib/tempusdominus/js/moment.min.js"></script>
    <script src="lib/tempusdominus/js/moment-timezone.min.js"></script>
    <script src="lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js"></script>

    <!-- Template Javascript -->
    <script src="js/main.js"></script>
</html>