import { ref, watch, computed, inject } from 'vue'
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
    
    
    function clearUser () {
        //delete axios.defaults.headers.common.Authorization
        console.log("limpar user")
        sessionStorage.removeItem('user')
        user.value = null
    }  
    
    
    async function login(credentials) {
        try {
            const response = await axios.post('auth/authenticate', credentials)
            
            console.log("DADOS LOGIN: " + JSON.stringify(response))

            user.value = {
                name: response.data.name,
                email: response.data.email,
            }
            //first.value = false
            sessionStorage.setItem('user',JSON.stringify(user.value))
            console.log("user: " + JSON.stringify(user.value))
            return true       
        } 
        catch(error) {
            clearUser()
            console.log("erro login: " + error.message)
            return false
        }
    }

    async function register(credentials) {
        try {
            const response = await axios.post('auth/register', credentials)
            return true       
        } 
        catch(error) {
            return false
        }
    }
    
    async function logout () {
        try {
            console.log("FDS")
            // o cookie ainda nao expirou, sera q nao tenho de fazer alguma coisa no backend para o expirar?
            await axios.post('auth/logout')
            console.log("FDS 2")
            clearUser()
            console.log("FDS 3")
            return true
        } catch (error) {
            console.log("error logout: " + error.message)
            return false
        }
    }

    
    async function restoreUser () {
        let storedUser = JSON.parse(sessionStorage.getItem('user'))
        if (storedUser) {
            console.log("storedUser: " + storedUser)
            user.value = storedUser
        }
    }
    
    
    return { user, register, login, logout, clearUser, restoreUser }
})
