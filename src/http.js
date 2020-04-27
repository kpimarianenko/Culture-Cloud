import project from './projectInfo'

export default class HTTP {
    static get(url, onLoad, onFailure, onSuccess) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.onload = onLoad;

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                onSuccess(xhr.response)
            }
            else {
                onFailure(xhr.response)
            }
        }

        xhr.send();
    }

    static async post(url, formID) {
        const response = await fetch(url, {
            method: 'POST', 
            body: new FormData(document.getElementById(formID))
        });
        return await response.json();
    }

    // static post(url, formID, onLoad, onFailure, onSuccess) {
    //     var xhr = new XMLHttpRequest();
    //     const formData = new FormData(document.getElementById(formID));

    //     xhr.open('POST', url, true);

    //     xhr.onload = onLoad;

    //     xhr.onreadystatechange = function() {
    //         if(xhr.readyState === 4 && xhr.status === 200) {
    //             console.log(xhr.response)
    //             onSuccess(xhr.response)
    //         }
    //         else {
    //             onFailure(JSON.parse(xhr.response))
    //         }

    //     }
        
    //     xhr.send(formData);
    // }

    static register(formID) {
        return this.post(`${project.dev.hostname}/api/v1/auth/register`, formID)
    }
} 