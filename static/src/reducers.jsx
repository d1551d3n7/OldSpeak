import {_} from 'lodash'
import cookie from 'react-cookie';

export const OldSpeakReactApplication = (state, action) => {
    const user_token = cookie.load('01d5p34k70kN');
    switch (action.type) {
        case "LIST_DOCUMENTS":
            return {...state, documents: action.documents}
            break;
        case "DOCUMENT_DETAILS":
            return {...state, currentDocument: action.document}
            break;
        case "DOCUMENT_DELETED":
            let filtered = state.documents.filter((document, i) => {
                return document.id !== action.document_id
            });
            return {...state, currentDocument: null, documents: filtered}
            break;
        case "CLEAR_ERRORS":
            return {...state, errors: []}
            break;
        case "ERROR":
            let errors = [...state.errors || [], {"message": action.message}];
            console.log(errors)
            return {...state, errors: errors}
            break;
        default:
            return {...state, user_token: user_token};
            break;
    }
}
