import { Router } from 'express';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { People } from './controllers/People';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();
const userController = new UserController();
const surveyController = new SurveyController();
const sendEmailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();
const people = new People("Mary",  24);

router.post("/users", userController.create);
router.get("/users", userController.show);
router.get("/mary", people.walk);

router.post("/surveys", surveyController.create);
router.get("/surveys", surveyController.show);

router.post("/sendMail", sendEmailController.execute);

router.get("/answers/:value", answerController.execute);

router.get("/nps/:survey_id", npsController.execute); 

// retornar a zona de classificação do NPS
//router.get("/nps/classificaiton", npsController.classification); 

export { router };