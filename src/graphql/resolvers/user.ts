import bcrypt from 'bcrypt'
import { AuthenticationError } from 'apollo-server-express';

import { UserModel } from "../../models/users";
import passwordValidate from "../../utils/passwordValidate";
import { newToken } from '../../utils/token';
import { UserInput } from '../../typings';
import AuthMiddleware from '../../utils/auth';


export const userResolvers = {
  Query: {
    getUser: async (_:any, {id}: {id: string}, ctx: any) => {
      try {
        const user = await AuthMiddleware(ctx)
        if(!user){
          throw new AuthenticationError(`Unauthorized User!`)
        }
        const Founduser = await UserModel.findById(id)
        console.log('getUser--->', user._id.toString(), Founduser?._id.toString());
        if(Founduser){
          if(user._id.toString() === Founduser?._id.toString()){
            return Founduser
          } else {
            throw new AuthenticationError(`Access denied!`)
            
          }
        }
        
      } catch (err) {
        console.log(err);
      }
    },
    
  
    logIn: async (_: any, userInput: Pick<UserInput['userSignUpInput'], 'username' | 'password'>) => {
      try {
        
        
        const user = await UserModel.findOne({username: userInput.username})
        
        if(!user){
          throw new AuthenticationError('SignUp first please!')
        }
        const passwordCheck = await bcrypt.compare(userInput.password, user.password)
        if(!passwordCheck){
          throw new AuthenticationError('Wrong username and/or password')
        }
        const token = newToken(user)
        console.log("token", token)
        return {
          _id: user._id,
          username: user.username,
          token,
          tokenExpire: 60
        }

      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    
      signUp: async (
        _: any,
        {userSignUpInput}: UserInput
        ) => {
          try {
            const user = await UserModel.findOne({username: userSignUpInput.username})
            if(user){
              throw new Error('username is taken choose unique one')
            }
            if(!passwordValidate(userSignUpInput.password)){
              throw new Error("Password doesn't meet password requirements.")
            }
            if(userSignUpInput.password !== userSignUpInput.confirmPassword){
              throw new Error("Password and confirm password don't match.")
            }
            const hashedPassword = await bcrypt.hash(userSignUpInput.password, 12)
            const newUser = new UserModel({ username: userSignUpInput.username, password: hashedPassword });
            // console.log("user--->", newUser);
            const savedUser = await newUser.save();
            const token = newToken(savedUser)
            return {
              //this keys should match to the output keys in the signup mutation Auth
              id: savedUser._id,
              username: savedUser.username,
              tokenExpire: 60,
              token
            };
            
            
          } catch (err) {
            console.log(err);
          }
        },
        
      },
    };
    