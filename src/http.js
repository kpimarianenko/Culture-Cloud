import project from './projectInfo'

export default class HTTP {
    static async get(url) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        return await response.json();
    }

    static async post(url, formID, formData) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData ? formData : new FormData(document.getElementById(formID))
        });
        return await response.json();
    }

    static registerByGoogle(formData) {
        return this.post(`${project.dev.hostname}/api/v1/auth/register`, null, formData)
    }

    static register(formID) {
        return this.post(`${project.dev.hostname}/api/v1/auth/register`, formID)
    }

    static loginByGoogle(formData) {
        return this.post(`${project.dev.hostname}/api/v1/auth/login`, null, formData)
    }

    static login(formID) {
        return this.post(`${project.dev.hostname}/api/v1/auth/login`, formID)
    }

    static getProfile() {
        return this.get(`${project.dev.hostname}/api/v1/me`)
    }

    static getCollaborators(page) {
        return this.get(`${project.dev.hostname}/api/v1/collaborators?page=${page}`)
    }

    static getCollaborator(id) {
        return this.get(`${project.dev.hostname}/api/v1/collaborators/${id}`)
    }

    static addExcursion(formID) {
        return this.post(`${project.dev.hostname}/api/v1/excursions`, formID)
    }

    static getCollaboratorsExcursions(collabID) {
        return this.get(`${project.dev.hostname}/api/v1/excursions/collaborators/${collabID}`)
    }
} 