import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";

export default class UsersController {
    public async register({ request, response }: HttpContextContract) {
        const input = request.only(['username', 'email', 'password'])
        try {
            const users = await User.create(input)
            return response.status(200).json({ code: 201, status: 'success', data: users })
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
    }
}
