import { IUser, IUserAPIAbstract } from './type'
import { protectedAPI } from 'entity/UserAuth/protectedApi'

export const userAPIUrl = '/user'

export class UserAPI implements IUserAPIAbstract {
    public async getById(userId: IUser['id']) {
        try {
            const resData = await protectedAPI.request<IUser>({
                url: `${userAPIUrl}/${userId}`,
                method: 'get',
            })

            return resData.data
        } catch (e) {
            // alert('Something happen while adding new task, check internet connection')
            console.log(e)
        }
    }
}
