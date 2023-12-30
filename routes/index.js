var express = require('express');
const dataController = require('../controllers/dataController');
const pageController = require('../controllers/pageController');
const authentication = require('../middlewares/authentication');
const loginController = require('../controllers/loginController');
const settingController = require('../controllers/settingController');
const verificationController = require('../controllers/verificationController');
const verification = require('../helpers/verification');
const pdfController = require('../controllers/pdfController');
var router = express.Router();

/* GET home page. */
router.get('/', authentication.checkAdmin, pageController.indexPage);

// ######################## LOGIN #######################
router.get('/login',authentication.checkLogin, pageController.loginPage)

router.post('/login', authentication.checkLogin, loginController.dologin)

// ###################### FORM ROUTES ##################
router.get('/cencus', authentication.checkAdmin, (req, res)=>res.render('pages/censusform'))

router.post('/data', authentication.checkAdmin, dataController.saveData)

router.get('/cdata', authentication.checkAdmin, pageController.dataPage)

router.get('/pdf/:id', pdfController.processPdf)

// ######################### LOGOUT #########################
router.post('/logout', authentication.checkAdmin, loginController.doLogout)

// ###################### DATA CONTROLLS ###################
router.post('/delete-data', authentication.checkAdmin, dataController.deleteData)

router.get('/edit-data', authentication.checkAdmin, pageController.editDataPage)

router.post('/edited-data/:id', authentication.checkAdmin, dataController.editedData)

// ########################## SETTINGS ########################
router.get('/settings/:id', authentication.checkAdmin, pageController.settingsPage)

router.post('/edit-admin/:id', authentication.checkAdmin, settingController.editAdmin)

router.post('/change-pass', authentication.checkAdmin, settingController.changePassword)

router.post('/add-admin', authentication.checkAdmin, settingController.addAdmin)

// ################### VERIFICATION #########################
router.get('/verify/:id', verificationController.verifyAdmin)

router.post('/verify-admin/:id', verificationController.verify)

// ####################### ERROR PAGE ######################
router.get('/error', pageController.errorPage)

module.exports = router;
