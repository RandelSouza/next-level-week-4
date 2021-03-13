import { Request, Response } from "express";
import { resolve } from 'path';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import AppError from "../errors/AppError";
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import SendMailService from "../services/SendMailService";

class SendMailController {
    async execute(request: Request, response: Response){
        const { email, survey_id } = request.body;
        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        
        const user = await usersRepository.findOne({ email });

        if(!user){
            throw new AppError("User does not exists!");            
        }
        
        const survey = await surveysRepository.findOne( { id: survey_id });

        if(!survey){
            throw new AppError("Survey does not exists!");                 
        }        

        const surveyUserAlreadyExistsValueNull = await surveysUsersRepository.findOne({
            where: {user_id: user.id, value: null},
            relations: ["user", "survey"]
        });

        const surveyUserAlreadyExistsValueNotNull = await surveysUsersRepository.findOne({
            where: {user_id: user.id, value: Not(IsNull())},
            relations: ["user", "survey"]
        });

        const npsPath = resolve(__dirname, "../", "views", "emails", "nbsMail.hbs");
        
        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        }
        
        if(surveyUserAlreadyExistsValueNull){
            variables.id = surveyUserAlreadyExistsValueNull.id;
            await SendMailService.execute(email, survey.title, npsPath, variables);
            return response.json(surveyUserAlreadyExistsValueNull);
        }
        else if(surveyUserAlreadyExistsValueNotNull){
            variables.id = surveyUserAlreadyExistsValueNotNull.id;
            await SendMailService.execute(email, survey.title, npsPath, variables);
            return response.json(surveyUserAlreadyExistsValueNotNull);
        }
        
        const surveyUser = surveysUsersRepository.create({
            user_id:  user.id,
            survey_id
        });

        await surveysUsersRepository.save(surveyUser);               

        variables.id = surveyUser.id;

        await SendMailService.execute(email, survey.title, npsPath, variables);

        const surveyUserNew = await surveysUsersRepository.findOne({
            where: {user_id: user.id, value: null},
            relations: ["user", "survey"]
        });

        return response.status(201).json(surveyUserNew);

    }
}

export { SendMailController };
