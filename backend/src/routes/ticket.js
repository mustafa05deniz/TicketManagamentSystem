const express = require('express');
const router = express.Router();
const multer = require('multer');
const Controller = require('../controllers/ticket');
const { check, validationResult } = require('express-validator');
const checkValidator = function (req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(404).json({ code: 1, msg: 'validation error', errors: errors.array() });
	}
	next();

};

const DIR = 'public/';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		
		cb(null, DIR);
	},
	filename: (req, file, cb) => {

		const fileName =new Date().getTime()+"-"+file.originalname.toLowerCase().split(' ').join('-');
		cb(null, fileName)
	}
});


// Multer Mime Type Validation


router.get('/', Controller.TicketsWithFilter);
router.get('/list', Controller.List);
router.get('/search', Controller.search);

router.post('/add',function(req,res,next){
	var userId = req.body.userId;

	var upload = multer({
		
		storage: storage,
		fileFilter: (req, file, cb) => {
			if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
				cb(null, true);
			} else {
				cb(null, false);
				return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
			}
		}
	}).array('files');
	upload(req,res,function(err){
		req.body.userId = userId;
		next();
	})
},Controller.addTicket);





router.post('/addMessageToTicket',function(req,res,next){
	var userId = req.body.userId;
	var upload = multer({
		storage: storage,
		fileFilter: (req, file, cb) => {
			if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
				cb(null, true);
			} else {
				cb(null, false);
				return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
			}
		}
	}).array('files');
	upload(req,res,function(err){
		req.body.userId = userId;
		next();
	})
}, Controller.addMessageToTicket);

router.post('/changeStatus', [
	check('ticketId', 'ticketId is not empty').notEmpty(),
	check('status', 'status is not empty').notEmpty(),
], checkValidator, Controller.changeStatus);



router.post('/deleteMessageToTicket', [
	check('ticketId', 'ticketId is not empty').notEmpty(),
	check('messageId', 'messageID is not empty').notEmpty(),
], checkValidator, Controller.deleteMessageToTicket);




module.exports = router;