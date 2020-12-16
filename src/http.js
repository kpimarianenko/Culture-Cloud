import project from './projectInfo'

export default class HTTP {
    static async get(url, params) {
        const response = await fetch(url, {
            method: 'GET',
            params,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        return {
            status: response.status,
            data: await response.json()
        };
    }

    static async post(url, formID, formData) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData ? formData : new FormData(document.getElementById(formID))
        });
        return {
            status: response.status,
            data: await response.json()
        };
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

    static getFilteredCollaborators(page, formID) {
        return this.post(`${project.dev.hostname}/api/v1/collaborators?page=${page}`, formID)
    }

    static getCollaborator(id) {
        return this.get(`${project.dev.hostname}/api/v1/collaborators/${id}`)
    }

    static addExcursion(formID) {
        return this.post(`${project.dev.hostname}/api/v1/excursions/new`, formID)
    }

    static addExhibit(formID) {
        return this.post(`${project.dev.hostname}/api/v1/exhibits/new`, formID)
    }

    static getCollaboratorsExcursions(collabID) {
        return this.get(`${project.dev.hostname}/api/v1/excursions/collaborators/${collabID}`)
    }

    static getCollaboratorsGallery(collabID, page) {
        return this.get(`${project.dev.hostname}/api/v1/collaborators/gallery/${collabID}?page=${page}`)
    }

    static getCollaboratorsFilters() {
        return this.get(`${project.dev.hostname}/api/v1/collaborators/filters`)
    }

    static getExcursions(page) {
        return this.get(`${project.dev.hostname}/api/v1/excursions?page=${page}`)
    }

    static getFilteredExcursions(page, formID) {
        return this.post(`${project.dev.hostname}/api/v1/excursions?page=${page}`, formID)
    }
} 