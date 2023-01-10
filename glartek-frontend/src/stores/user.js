import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import router from '../router'

export const useUserStore = defineStore('user', () => {
    const axios = inject('axios')
    const user = ref(null)


    /*
    async function loadUser () {
        try {
            const response = await axios.get('users/me')
            user.value = response.data.data
        } catch (error) {
            clearUser () 
            throw error
        }
    }
    */
    
    /*
    function clearUser () {
        //delete axios.defaults.headers.common.Authorization
        //sessionStorage.removeItem('token')
        user.value = null
    }  
    */
    
    async function login(credentials) {
        try {
            const response = await axios.post('auth/authenticate', credentials)
            
            //axios.defaults.headers.common.Authorization = "Bearer " + response.data.token
            console.log("DADOS LOGIN: " + JSON.stringify(response))
            //sessionStorage.setItem('token', response.data.token)
            //await loadUser()
            user.value = {
                name: response.data.name,
                email: response.data.email,
            }
            console.log("user: " + JSON.stringify(user.value))
            return true       
        } 
        catch(error) {
            user.value = null
            console.log("erro login: " + error.message)
            return false
        }
    }

    async function register(credentials) {
        try {
           // console.log("")
            const response = await axios.post('auth/register', credentials)
            axios.defaults.headers.common.Authorization = "Bearer " + response.data.access_token
            sessionStorage.setItem('token', response.data.access_token)  
            return true       
        } 
        catch(error) {
            user.value = null
            return false
        }
    }
    
    async function logout () {
        try {
            // o cookie ainda nao expirou, sera q nao tenho de fazer alguma coisa no backend para o expirar?
            user.value = null
            return true
        } catch (error) {
            return false
        }
    }

    /*
    async function restoreToken () {
        let storedToken = sessionStorage.getItem('token')
        if (storedToken) {
            axios.defaults.headers.common.Authorization = "Bearer " + storedToken
            //await loadUser()
            return true
        }
        clearUser()
        return false
    }
    */
    
    return { user, register, login, logout }
})
