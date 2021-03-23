import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import AppError from '../errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
    test: string = "test";

    async create(request: Request, response: Response){

        const { name, email } = request.body;
        
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        });   
              
        try{
            await schema.validate(request.body, { abortEarly: false });

        }catch(error){
            throw new AppError(error);
        }
        
        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne( { email } );

        if(userAlreadyExists){
            throw new AppError("User Alright Exists!");
        }

        const user = usersRepository.create({
            name, email
        });

        await usersRepository.save(user);

        return response.status(201).json(user);
    }

    async show(request: Request, response: Response){      
        const usersRepository = getCustomRepository(UsersRepository);

        const allUsers = await usersRepository.find();

        return response.json(allUsers);
    }

    async update(request: Request, response: Response){
        const { name, email } = request.body;
        const { user_id } = request.params;

        const usersRepository = getCustomRepository(UsersRepository);
        
        const userAlreadyExists = await usersRepository.findOne({
             id: user_id
        });

        if(!userAlreadyExists){
            throw new AppError("User Not Exists!");
        }
        
        await usersRepository.update(
            user_id,
            {
                name: name,
                email: email
            }
        );

        const userUpdated = await usersRepository.findOne({
            id: user_id
        });

        console.log(this.test);
        
        return response.json(userUpdated);
    }

    async delete(request: Request, response: Response){
        const { user_id } = request.params;

        const usersRepository = getCustomRepository(UsersRepository);

        const userDeleted = await usersRepository.delete({ id: user_id });

        response.json(userDeleted.affected);
    }
       
}

export { UserController };
