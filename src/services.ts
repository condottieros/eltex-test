import axios from '@/plugins/axios'
import store from '@/store'

type CheckResult = {
    result: boolean,
    payload?: string
}

export async function checkLoginService(): Promise<boolean> {
    const {data} = await axios.get<CheckResult>('/check-auth')      
    if (data.result) store.commit('login', data.payload) // коммитим юзера если он авторизован    
    return data.result

}