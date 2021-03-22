import { Request, Response } from 'express';
import { Router } from 'express';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();
const userController = new UserController();

const surveyController = new SurveyController();
const sendEmailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post("/users", userController.create);
router.get("/users", userController.show);
router.put("/users/:user_id", (request: Request, response: Response) => userController.update(request, response));
router.delete("/users/:user_id", userController.delete);

router.post("/surveys", surveyController.create);
router.get("/surveys", surveyController.show);

router.post("/sendMail", sendEmailController.execute);

router.get("/answers/:value", answerController.execute);

router.get("/nps/:survey_id", npsController.execute); 

// retornar a zona de classificação do NPS
//router.get("/nps/classificaiton", npsController.classification); 

export { router };
