import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Faske from 'App/Models/Faske'
import FaskesEditValidator from 'App/Validators/FaskesEditValidator'
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
        const input = await request.validate(FaskesEditValidator)
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
            console.log(faskes)
            if(faskes){
                await faskes?.delete()
                return response.status(200).json({ code: 200, status: 'success', data: faskes })
            }else{
                return response.status(404).json({ code: 404, status: 'not found'})
            }
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
    }
    public async pdf({ response }: HttpContextContract) {
        try {
            const PDFDocument = require('pdfkit');
            const fs = require('fs');
        
            const faskes = await Faske.all() 

            const doc = new PDFDocument();
            doc.pipe(fs.createWriteStream('output.pdf'));
            doc.text('Fasilitas Kesehatan').fontSize(10)
            for (const faske of faskes) {
                doc.text(`
                ${faske.id}. Name: ${faske.name}
                Type: ${faske.faskes_type}
                Total Nakes: ${faske.total_nakes}
                `).fontSize(10)
                // console.log(faske.name)
            }
            doc.end()
            return response.status(200).json({ code: 200, status: 'success', data: 'pdf output' })
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
    }
}
