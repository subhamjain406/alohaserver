var AuthenticationController = require('./controllers/authentication'),
    ProgramController = require('./controllers/programmes'),
    CenterController = require('./controllers/centers'),
    FranchiseController = require('./controllers/franchisees'),
    InstructorController = require('./controllers/instructors'),
    StudentController = require('./controllers/students'),
    NotificationController = require('./controllers/notifications'),
    PostOrderController = require('./controllers/post-order'),
    PriceMappingController = require('./controllers//price-mapping'),
    InventoryController = require('./controllers/inventory'),
    PassBookControler = require('./controllers/passbook'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false }),
    requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {

    app.all('/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin", "X-Requested-With", "Content-Type", "Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST", "PUT", "DELETE", "HEAD", "OPTIONS");
        next();
    });

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        programRoutes = express.Router(),
        centerRoutes = express.Router(),
        franchiseRoutes = express.Router(),
        instructorRoutes = express.Router(),
        studentRoutes = express.Router(),
        notificationsRoutes = express.Router(),
        postOrderRoutes = express.Router(),
        priceMappingRoutes = express.Router(),
        inventoryRoutes = express.Router(),
        passbookRoutes = express.Router();

    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/update', AuthenticationController.update);
    authRoutes.post('/delete', AuthenticationController.delete);
    authRoutes.post('/login', AuthenticationController.login);
    authRoutes.post('/forgotPassword', AuthenticationController.forgotPassword);
    authRoutes.get('/usersList', AuthenticationController.getUsers);
    authRoutes.get('/protected', function (req, res) {
        res.send({ content: 'Success' });
    });

    // Center Routes
    apiRoutes.use('/centers', centerRoutes);
    centerRoutes.get('/', CenterController.getCenters);
    centerRoutes.post('/', CenterController.createCenter);
    centerRoutes.put('/', CenterController.updateCenter);

    // Program Routes
    apiRoutes.use('/programmes', programRoutes);
    programRoutes.get('/', ProgramController.getProgrammes);
    programRoutes.post('/', ProgramController.createProgram);
    programRoutes.put('/', ProgramController.updateProgram);

    // Franchise Routes
    apiRoutes.use('/franchise', franchiseRoutes);
    franchiseRoutes.get('/', FranchiseController.getFranchisees);
    franchiseRoutes.post('/', FranchiseController.createFranchise);
    franchiseRoutes.put('/', FranchiseController.updateFranchise);

    // Instructor Routes
    apiRoutes.use('/instructor', instructorRoutes);
    instructorRoutes.get('/', InstructorController.getInstructors);
    instructorRoutes.post('/', InstructorController.createInstructor);
    instructorRoutes.put('/', InstructorController.updateInstructor);

    // Student Routes
    apiRoutes.use('/students', studentRoutes);
    studentRoutes.get('/', StudentController.getStudent);
    studentRoutes.post('/', StudentController.createStudent);
    studentRoutes.put('/', StudentController.updateStudent);

    // Notifications Routes
    apiRoutes.use('/notifications', notificationsRoutes);
    notificationsRoutes.get('/', NotificationController.getNotification);
    notificationsRoutes.post('/', NotificationController.createNotification);
    notificationsRoutes.put('/', NotificationController.updateNotification);

    // post-order Routes
    apiRoutes.use('/postorder', postOrderRoutes);
    postOrderRoutes.get('/', PostOrderController.getPostOrder);
    postOrderRoutes.post('/', PostOrderController.createPostOrder);
    postOrderRoutes.put('/', PostOrderController.updatePostOrder);

    // price-mapping Routes
    apiRoutes.use('/pricemapping', priceMappingRoutes);
    priceMappingRoutes.get('/', PriceMappingController.getPriceMapping);
    priceMappingRoutes.post('/', PriceMappingController.createPriceMapping);
    priceMappingRoutes.put('/', PriceMappingController.updatePriceMapping);

    // inventoty routes
    apiRoutes.use('/inventory', inventoryRoutes);
    inventoryRoutes.get('/', InventoryController.getInventory);
    inventoryRoutes.post('/', InventoryController.createInventory);
    inventoryRoutes.put('/', InventoryController.updateInventory);

    // passbook routes
    apiRoutes.use('/passbook', passbookRoutes);
    passbookRoutes.get('/', PassBookControler.getPassBook);
    passbookRoutes.post('/', PassBookControler.createPassBook);
    passbookRoutes.put('/', PassBookControler.updatePassBook);

    // Set up routes
    app.use('/api', apiRoutes);

}
