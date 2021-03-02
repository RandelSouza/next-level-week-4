import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

    // http://localhost:3333/answers/0?u=41503a2d-8414-42cc-9e4f-e03a88adf507

    async execute(request: Request, response: Response){
        const { value } = request.params;
        const { u } = request.query;
        
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if(!surveyUser){
            throw new AppError("Survey User does not exists!");
        };
        
        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        response.json(surveyUser);
    };
};

export { AnswerController };
