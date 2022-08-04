import bcrypt from 'bcrypt'
import { AuthenticationError } from 'apollo-server-express';

import { UserModel } from "../../models/users";
import passwordValidate from "../../utils/passwordValidate";
import { newToken } from '../../utils/token';
import { FullUserInput, UserInput } from '../../typings';
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
      saveFullUserInfo: async (_: any, {user}: FullUserInput, ctx: any)=>{
        try {
          const authUser = await AuthMiddleware(ctx)
        if(!authUser){
          throw new AuthenticationError(`Unauthorized User!`)
        }
        
        const Founduser = await UserModel.findById(user._id)
        console.log("user=-->", Founduser?._id, authUser._id)
        if(Founduser){
          if(authUser._id.toString() === Founduser?._id.toString()){
            const userUpdate = await UserModel.findByIdAndUpdate(Founduser._id, {
              _id: Founduser._id,
              username: Founduser.username,
              firstName: user._id,
              lastName: user.lastName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              bio: user.bio
            })
            return userUpdate
          } else {
            throw new AuthenticationError(`Unauthorized User!!`)
          }

        } else {
          throw new AuthenticationError(`${user._id} not Found`)
        } 
        } catch (err) {
          console.log(err)
        }
      },  
      },
    };
    