
import React, { useState } from "react";
import logo from '../img/logo.png';
import { useSelector } from "react-redux";
import firebaseApp from "../firebase/credenciales";

import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import './Edit.css';

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);



function Edit() {
    
    const [tipo,setTipo] = useState('Public');
    const [uploadValue,setUploadValue] = useState({uploadValue:0,picture:''});
    const [storageRef, setStorageRef] = useState([]);
    const [file,setFile] = useState([]);
    const [storageRefPortal, setStorageRefPortal] = useState([]);
    const [filePortal,setFilePortal] = useState([]);

    let user = useSelector(state => state.user);
    let users = useSelector(state => state.users);


    let actual = users.find( e => e.email === user.user.email);

    const email = actual.email;
    const sex = actual.sex;
    const age = actual.age;
    const uid = user.user.uid;
 
    async function editUser(password,username) {
        
        const docuRef = doc(firestore, `users/${uid}`);

        setDoc(docuRef,{
            email:email,
            password: password,
            username:username,
            sex:sex,
            age:age,
            tipo:tipo
        });
    };


    function submitHandler(e) {

        e.preventDefault();

        const username = e.target.elements.newUsername.value;
        const password = e.target.elements.newPassword.value;
        
        editUser(password,username);

        e.target.elements.newUsername.value='';
        e.target.elements.newPassword.value='';
    };

    function tipoPerfil(e){

        setTipo(e.target.value)

    };

    function onUpload(e){
        
        const stoRef = ref(storage,`Fotos/${e.target.files[0].name}`); 
        setStorageRef(stoRef) 
        setFile(e.target.files[0])

    };

    function upLoad() {

        const uploadTask = uploadBytes(storageRef, file)
            .then((snapshot) => {
            console.log('Uploaded a blob or file!');
            });
        
        uploadTask.on('state_changed', 
            (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadValue({uploadValue: percentage})
        },
            (error) => {
            console.log(error.message)
        },
            ()=>{
            
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);

                setUploadValue({
                    uploadValue:100,
                    picture: downloadURL
                })

              });
            
        });
        
        document.getElementById('file').value='';
    };
    
    function onUploadPortal(e){
        
        const stoRef = ref(storage,`Fotos/${e.target.files[0].name}`); 
        setStorageRefPortal(stoRef) 
        setFilePortal(e.target.files[0])

    };

    function upLoadPortal() {

        const uploadTask = uploadBytes(storageRefPortal, filePortal).then((snapshot) => {
            console.log('Uploaded a blob or file!');
          });

          uploadTask.on('state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
            });
          }
        );

        document.getElementById('portada').value='';
    };

    return (
        <div className="body">
            <div className="edit-box">
            <img className = 'avatar'src={logo} alt="logo"/>
                <h2>Edit Profile</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor = 'username'>New Username</label>
                    <input
                        id="newUsername" 
                        type = 'text' 
                        placeholder="Enter New Username"/>

                    <label htmlFor = 'password'>New Password</label>
                    <input 
                        id="newPassword"
                        type = 'password' 
                        placeholder="Enter New Password"/>

                    <label>Cambiar foto de Perfil</label>
                    <p>
                        <progress value={uploadValue.uploadValue} max='100'></progress>
                        <input 
                            id = 'file'
                            onChange={onUpload}
                            type = 'file' 
                            name = 'imagen subida'/>
                        <input 
                            onClick={upLoad}
                            type = 'button' 
                            value = 'subir imagen'/>
                    </p>

                    <label htmlFor = 'imgPortada'>Cambiar foto de Portada</label>
                    <p>
                        <input
                            id="portada"
                            onChange={onUploadPortal}
                            type = 'file' 
                            name = 'imagen subida'/>
                        <input 
                            onClick={upLoadPortal}
                            type = 'button' 
                            value = 'subir imagen'/>
                    </p>

                    <label htmlFor = 'account'>Type Account</label>

                    <div 
                        className='T' 
                        >
                        <div 
                            className="se"
                            onChange={tipoPerfil}>
                            <input type = 'radio'  name='tipo' defaultChecked value='Publico'/>
                            <label>Public</label>
                        </div>
                        <div 
                            className="se"
                            onChange={tipoPerfil}>
                            <input type = 'radio' name='tipo' value = 'Privado'/>
                            <label>Privado</label>
                        </div>
                    </div>

                    <input 
                        type ='button' 
                        value='Eliminar cuenta'/>
                    
                    <input 
                        type = 'submit' 
                        value='Aplicar'/>
                </form>
            </div>
        </div>
    );
};

export default Edit;