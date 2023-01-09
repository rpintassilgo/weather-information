import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const axios = inject('axios')
    
    const user = ref(null)

    
    const userId = computed(() => {
        return user.value?.id ?? -1
    })

    async function loadUser () {
        try {
            const response = await axios.get('users/me')
            user.value = response.data.data
        } catch (error) {
            clearUser () 
            throw error
        }
    }
    
    function clearUser () {
        delete axios.defaults.headers.common.Authorization
        sessionStorage.removeItem('token')
        //user.value = null
    }  
    
    async function login(credentials) {
        try {
            const response = await axios.post('auth/authenticate', credentials)
            axios.defaults.headers.common.Authorization = "Bearer " + response.data.token
            console.log("DADOS LOGIN: " + JSON.stringify(response.data))
            sessionStorage.setItem('token', response.data.token)
            //await loadUser()
            user.value = {
                name: response.data.user.name,
                email: response.data.user.email,
            }
            console.log("user: " + JSON.stringify(user.value))
            return true       
        } 
        catch(error) {
            clearUser()
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
            clearUser()
            //projectsStore.clearProjects()
            return false
        }
    }
    
    async function logout () {
        try {
            await axios.post('auth/logout')
            //clearUser()
            return true
        } catch (error) {
            return false
        }
    }

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
    
    return { user, userId, register, login, logout, restoreToken }
})
