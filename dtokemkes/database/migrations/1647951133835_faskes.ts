import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Faskes extends BaseSchema {
  protected tableName = 'faskes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.enum('faskes_type', ['RS', 'Puskesmas', 'Posyandu', 'Klinik']).notNullable()
      table.integer('total_nakes').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
