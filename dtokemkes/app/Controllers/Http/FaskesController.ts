import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Faske from 'App/Models/Faske'
import FaskeValidator from 'App/Validators/FaskeValidator'

export default class FaskesController {
    public async create({ request, response }: HttpContextContract) {
        const input = await request.validate(FaskeValidator)
        try {
            const faskes = await Faske.create(input)
            return response.status(200).json({ code: 201, status: 'success', data: {faskes} })
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
    }
    public async read({ response }: HttpContextContract) {
        try {
            const faskes = await Faske.all()
            return response.status(200).json({ code: 200, status: 'success', data: faskes })
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
    }
    public async edit({ params, request, response }: HttpContextContract) {
        const input = await request.validate(FaskeValidator)
        try {
            const faskes = await Faske.findBy('id', params.id)
            faskes?.merge(input)
            await faskes?.save()
            return response.status(200).json({ code: 200, status: 'success', data: faskes })
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
    }
    public async delete({ params, response }: HttpContextContract) {
        try {
            const faskes = await Faske.findBy('id', params.id)
            await faskes?.delete()
            return response.status(200).json({ code: 200, status: 'success', data: faskes })
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
    }
}
