import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import RegisterValidator from 'App/Validators/RegisterValidator';
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
    public async register({ request, response }: HttpContextContract) {
        const input = await request.validate(RegisterValidator)
        try {
            const users = await User.create(input)
            return response.status(200).json({ code: 201, status: 'success', data: users })
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
    }
    public async login({ request, response, auth }: HttpContextContract) {
        const input = request.only(['email', 'password'])
        try {
            let user = await User.findBy('email', input.email)
            if(user){
                if (await Hash.verify(user.password, input.password)) {
                    const token = await auth.use('api').attempt(input.email, input.password)
                    // user.isLogin = true
                    // await user.save()
                    // await User
                    // .query()
                    // .where('id', user.id)
                    // .update({ isLogin: true })

                    return response.status(200).json({ code: 200, status: 'success', data: token.toJSON() })
                }else{
                    return response.status(400).json({ code: 400, status: 'password/email is incorrect', data: user })
                }
            }else{
                return response.status(404).json({ code: 404, status: 'not found'})
            }
        } catch (err) {
            console.log('MASUK SINI')
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
    }
}
