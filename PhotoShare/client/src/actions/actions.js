import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

const GET_START = 'GET_START';

const getStart = ()=> {

    return async (dispatch) => {

        const users = [];
        const collectionRef = collection(db,'users')
        const snapshot = await getDocs(collectionRef);

        snapshot.forEach(doc => {
            users.push(doc.data())
        });
    
        dispatch({type: GET_START, payload: users})
    }
};

export {getStart};