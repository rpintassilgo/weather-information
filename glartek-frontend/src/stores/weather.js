import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from "./user.js"

export const useWeatherStore = defineStore('weather', () => {
    const userStore = useUserStore()

    const axios = inject('axios')
    
    const projects = ref([])

    function getProjectsByFilter(responsibleId, status) {
        return projects.value.filter( prj =>
            (!responsibleId || responsibleId == prj.responsible_id) &&
            (!status || status == prj.status)
        )
    }
    
    function getProjectsByFilterTotal(responsibleId, status) {
        return getProjectsByFilter(responsibleId, status).length
    }

    function clearProjects() {
        projects.value = []
    }

    async function loadProjects() {
        try {
            const response = await axios.get('projects')
            projects.value = response.data.data
            return projects.value
        } catch (error) {
            clearProjects()
            throw error
        }
    }
    
 
    
    return { projects, getProjectsByFilter, getProjectsByFilterTotal, loadProjects, clearProjects }
})
