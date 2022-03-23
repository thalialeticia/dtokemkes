import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import RegisterValidator from 'App/Validators/RegisterValidator';
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
    public async register({ request, response, auth }: HttpContextContract) {
        const input = await request.validate(RegisterValidator)
        try {
            const user = await User.create(input)
            const token = await auth.use('api').attempt(input.email, input.password)
            console.log(user)
            user.login = 'true'
            await user.save()
            return response.status(200).json({ code: 201, status: 'success', data: {user, token} })
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
                    user.login = 'true'
                    await user.save()
                    const token = await auth.use('api').attempt(input.email, input.password)

                    return response.status(200).json({ code: 200, status: 'success', data: token.toJSON() })
                }else{
                    return response.status(400).json({ code: 400, status: 'password/email is incorrect' })
                }
            }else{
                return response.status(404).json({ code: 404, status: 'not found'})
            }
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
    }
    public async logout({ request, response, auth }: HttpContextContract) {
        try {
            await auth.use('api').authenticate()
            let userId = auth.use('api').user!.id
            const user = await User.findOrFail(userId)
            user.login = 'false'
            await user.save()
            return response.status(200).json({ code: 200, status: 'success', data: user })
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
    }
}
