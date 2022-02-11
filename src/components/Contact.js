import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth'
import firebase from '../firebase'
import { onSnapshot, collection, addDoc, setDoc, deleteDoc, doc } from 'firebase/firestore';
import '../css/Contact.css'

export default function Contact() {

    const [user, setUser] = useState();
    const [contactArray, setContactArray] = useState([]);
    const [contactTemp, setContactTemp] = useState({});
    const [addDisplay, setAddDisplay] = useState(false);
    const [newContact, setNewContact] = useState({first: "", last: "", email: "", phone: ""});
    const [editDisplay, setEditDisplay] = useState(false);
    const [uniqueContact, setUniqueContact] = useState([]);
    let navigate = useNavigate();

    // FIXME: onAuthStateChanged doesn't set the user and contactArray fast enough
    // so when displaying in HTML, I get an error because I'm displaying nothing
    useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, (userAuth) => {
            console.log("userAuth:");
            setUser(userAuth);
            console.log(user);

            onSnapshot(collection(firebase, "Contacts"), (snapshot) => {
                setContactArray(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
                console.log(contactArray);
            });
        })
    }, []);

    const loadContact = contactArray.filter((contact) => contact.uid === user.uid);
    
    useEffect(() => {
        setUniqueContact(loadContact)
    }, [contactArray]);

    console.log(contactArray);
    console.log(loadContact);

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth);
        redirectLogin();
    }

    const redirectLogin = () => {
        navigate("/");
    }

    const printInfo = () => {
        console.log("printing info:");
        console.log(user);
        console.log(contactArray);
        console.log(user.uid);
    }

    const handleAdd = () => {
        setAddDisplay(true);
    }

    const actualAdd = () => {
        addDoc(collection(firebase, "Contacts"), {...newContact, uid: user.uid})
        console.log("User added!");
    }

    const handleInput = (e) => {
        setNewContact({...newContact, [e.target.name]: e.target.value});
        console.log(newContact);
    }

    const handleEdit = (contact) => {
        setContactTemp(contact);
        console.log(contactTemp);
        setEditDisplay(true);
    }

    const actualEdit = () => {
        setDoc(doc(firebase, "Contacts", contactTemp.id), {...newContact, userID: user.uid});
    }

    const disableEdit = () => {
        setEditDisplay(false);
    }

    const handleDelete = (contact) => {
        setContactTemp(contact);

        if (window.confirm("Do you want to delete?")) {
            deleteDoc(doc(firebase, "Contacts", contactTemp.id));
        }
    }

    return (
        <div>
            {!editDisplay && <div className='contact-main'>
                <h1>Contacts</h1>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={printInfo}>info</button>
                <button onClick={handleAdd}>Add Contact</button>
                {addDisplay && 
                    <div>
                        <input type="text" placeholder='First Name' name="first" onChange={handleInput}></input>
                        <input type="text" placeholder='Last Name' name="last" onChange={handleInput}></input>
                        <input type="text" placeholder='Email' name="email" onChange={handleInput}></input>
                        <input type="text" placeholder='Phone' name="phone" onChange={handleInput}></input>
                        <button onClick={actualAdd}>Add</button>
                    </div>}
                <div className='contact-row'>
                    <h2 className='contact-large-flex'>First</h2>
                    <h2 className='contact-large-flex'>Last</h2>
                    <h2 className='contact-large-flex'>Phone</h2>
                    <h2 className='contact-large-flex'>Email</h2>
                    <p className='contact-small-flex'></p>
                    <p className='contact-small-flex'></p>
                </div>
                <div>
                    {
                        uniqueContact.map((contact) => (
                            <div className='contact-row'>
                                <p className='contact-large-flex'>{contact.first}</p>
                                <p className='contact-large-flex'>{contact.last}</p>
                                <p className='contact-large-flex'>{contact.phone}</p>
                                <p className='contact-large-flex'>{contact.email}</p>
                                <button className='contact-small-flex' onClick={() => handleEdit(contact)}>edit</button>
                                <button className='contact-small-flex' onClick={() => handleDelete(contact)}>delete</button>
                            </div>
                        ))
                    }
                </div>
            </div>}
            {editDisplay && 
            <div className='contact-edit'>
                <div className='contact-edit-form'>
                    <div>
                        <input type="text" placeholder='First Name' name="first" onChange={handleInput} value={contactTemp.first}></input>
                    </div>
                    <div>
                        <input type="text" placeholder='Last Name' name="last" onChange={handleInput} value={contactTemp.last}></input>
                    </div>
                    <div>
                        <input type="text" placeholder='Email' name="email" onChange={handleInput} value={contactTemp.email}></input>
                    </div>
                    <div>
                        <input type="text" placeholder='Phone' name="phone" onChange={handleInput} value={contactTemp.phone}></input>
                    </div>
                    <button onClick={actualEdit}>Edit</button>
                    <button onClick={disableEdit}>Cancel</button>
                </div>
            </div>}
        </div>
        


    )
}
