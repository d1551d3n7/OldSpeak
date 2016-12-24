import request from 'superagent';
import cookie from 'react-cookie';


function handle(callback) {
    return function (err, response){
        if (err) {
            console.log("error:", err);
        }
        if (response) {
            console.log(response);
        }
        if (err !== null && parseInt(err.status) == 401 && getToken().length > 8) {
            location.href = '/logout'
        } else if (response && response.body){
            callback(response.body, err);
        }
    }
}

function getToken() {
    return cookie.load('01d5p34k70kN');
}

class APIClient {
    constructor() {
    }
    doGET(path, callback){
        return request.get(path)
                      .set('Authorization', "Bearer: " + getToken())
                      .set('Accept', 'application/json')
                      .end(handle(callback));

    }
    doPOST(path, payload, callback) {
        return request.post(path)
                      .set('Authorization', "Bearer: " + getToken())
                      .set('Accept', 'application/json')
                      .send(payload)
                      .end(handle(callback));
    }
    doPATCH(path, payload, callback) {
        return request.patch(path)
                      .set('Authorization', "Bearer: " + getToken())
                      .set('Accept', 'application/json')
                      .send(payload)
                      .end(handle(callback));
    }
    doPUT(path, payload, callback) {
        return request.put(path)
                      .set('Authorization', "Bearer: " + getToken())
                      .set('Accept', 'application/json')
                      .send(payload)
                      .end(handle(callback));
    }
    doDELETE(path, callback) {
        return request.delete(path)
                      .set('Authorization', "Bearer: " + getToken())
                      .set('Accept', 'application/json')
                      .send()
                      .end(handle(callback));
    }

    authenticate(callback) {
        return this.doGET('/api/user', callback);
    }
    createDocument(fingerprint, callback){
        return this.doPOST('/api/document', {"fingerprint": fingerprint}, callback);
    }
    saveDocument(document_id, callback){
        return this.doPOST('/api/document', {"id": document_id}, callback);
    }
    deleteDocument(document_id, callback){
        return this.doDELETE('/api/document', {"id": document_id}, callback);
    }
}

export default APIClient
