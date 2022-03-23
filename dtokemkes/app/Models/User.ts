import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public login: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //hooks
  //The beforeSave hook is invoked before the INSERT and the UPDATE queries.
  // Hooks can be async. So you can use the await keyword inside them.
  //Hooks are always defined as static functions and receive the model's instance as the first argument.
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
  //   Understanding the $dirty property
  // The beforeSave hook is called every time a new user is created or updated using the model instance.

  // During the update, you may have updated other properties but NOT the user password. Hence there is no need to re-hash the existing hash, which is why using the $dirty object.

  // The $dirty object only contains the changed values. So, you can check if the password was changed and then hash the new value.
}
