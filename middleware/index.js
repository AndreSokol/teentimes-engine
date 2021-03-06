module.exports = function (app, express) {
    var ejs = require('ejs-locals'),
        path = require('path'),
		bodyParser = require('body-parser'),
        router = require('../route'),
		session = require('express-session'),
		sockets = require('./sockets'),
        engine = require('./engine');

    app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000);
    app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP);
    
	/* *
     * Page Rendering
     * */
    app.engine('html', ejs);
    app.engine('ejs', engine.render);
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'ejs');
	
	/* *
	 * POST request thingy
	 * */
	app.use(bodyParser.urlencoded({ extended: false }));
	
	/* *
	 * Authentification
	 * */
	app.use(session({secret: 'they call me mellow yellow',
					resave: false,
					saveUninitialized: true
					}));

    /* *
     * Public directory
     * */
    app.use(express.static(path.join(__dirname, '../public')));
    app.use("/public", express.static(path.join(__dirname, '../public')));
	
    /* *
     * Routing
     * */
    router(app);
	
	/* *
	 * Sockets
	 * */
	//sockets(app);
};