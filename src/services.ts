import axios from '@/plugins/axios'
import store from '@/store'

type CheckResult = {
    result: boolean,
    payload?: string
}

export async function checkLoginService(): Promise<boolean> {
    const {data} = await axios.get<CheckResult>('/check-auth')      
    if (data.result) store.commit('login', data.payload) // коммитим юзера если он авторизован
    store.commit('setLoginChecked', true) // установим флаг что проверка уже логина произведена
    return data.result

}