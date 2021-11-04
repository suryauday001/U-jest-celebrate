// import React from 'react'
import Image from 'next/image'
import React, { useEffect, useState, Component } from 'react';
import { collection, addDoc, setDoc, doc, docs, getDocs, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import firebaseApp from '../firebaseConfig'
import { getFirestore } from "firebase/firestore";
import { delBasePath } from 'next/dist/shared/lib/router/router';

const db = getFirestore();

function UploadContentBox() {
    const [newName, setNewName] = useState("");
    const [newLike, setNewLike] = useState(0);
    const [hashtag, setHashtag] = useState('');
    const [imageURL, setimage] = useState('');
    const [imagename, setImagename] = useState("")
    const usersCollectionRef = collection(db, "ujustcelebrate");
    const [formsubmit, setFormsubmit] = useState(true)
    const [showpopup, setShowpopup] = useState(true)
    const [isClick, setClick] = useState(false);

    const createUser = async () => {

        await addDoc(usersCollectionRef, { name: newName, newLike: { totalnumber: Number(newAge), } });
    };
    const createContent = async () => {
        const data = {
            hashtag: hashtag,
            imageUrl: imageURL,
            like: newLike,
        }
        console.log(data);
        setHashtag('');
        setimage('');
        setImagename('');
        setFormsubmit(false);
        await addDoc(usersCollectionRef, data);
        
    };

    // content type
    const contentType = e => {
        const target = e.target;
        if (target.checked) {
            setContype(target.value);
        }
    };

    // base 64 converter (image converter)
    const getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                console.log("Called", reader);
                baseURL = reader.result;
                console.log(baseURL);
                resolve(baseURL);

            };
            console.log(fileInfo);
        });
    };
    const updateUser = async (id, like) => {
        const userDoc = doc(db, "ujustcelebrate", id);
        const newFields = { like: like + 1 };
        await updateDoc(userDoc, newFields);
    };

    const deleteUser = async (id) => {
        const userDoc = doc(db, "ujustcelebrate", id);
        await deleteDoc(userDoc);
    };

    const showpopupfun = event => {
        setShowpopup(true);
        setFormsubmit(true);
    }

    function hideShowpop() {
        setShowpopup(false);
    }

    // useEffect(() => {
    //     const getUsers = async () => {
    //         const data = await getDocs(usersCollectionRef);
    //         setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //         console.log(data);
    //     };

    //     getUsers();
    // }, []);

    // Create a reference to the hidden file input element
    const hiddenFileInput = React.useRef(null);

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file 
    const handleChange = event => {
        const fileUploaded = event.target.files[0].name;
        const file = event.target.files[0];
        console.log(fileUploaded);
        //props.handleFile(fileUploaded);
        setImagename(fileUploaded)
        getBase64(file)
            .then(result => {
                file["base64"] = result;
                console.log("File Is", file);
                setimage(result)
            })
            .catch(err => {
                console.log(err);
            });
        //setImagename()
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('This will run after 1 second!')
            setShowpopup(false)
        }, 5000);
        // return () => clearTimeout(timer);
    }, []);


    return (
        <>


            {
                showpopup ?
                    <>
                        <div onClick={() => hideShowpop()} className="transBg"></div>
                        <section className="uploadBox">
                            {formsubmit ?
                                <ul>
                                    <li><h3>Upload Your Happy Faces</h3></li>
                                    <li>
                                        <input type="text" value={hashtag}
                                            placeholder="Add Hash tag"
                                            onChange={(event) => {
                                                setHashtag(event.target.value)
                                            }} />
                                    </li>
                                    <li className="uploadbtn">
                                        <button onClick={handleClick}>
                                            Upload
                                        </button>
                                        <input
                                            type="file"
                                            ref={hiddenFileInput}
                                            onChange={handleChange}
                                            style={{ display: 'none' }}
                                        />
                                        <input type="text" value={imagename} placeholder="Select Image" />

                                    </li>
                                    <li>
                                        <button
                                            className="submitbtn" onClick={createContent} disabled={!hashtag || !imageURL}>SUBMIT
                                        </button>
                                    </li>
                                </ul> : <h2><strong><span>UJustB</span>righten</strong> up Happy Faces</h2>
                            }

                        </section>
                    </> : <button onClick={showpopupfun} className="uploadBtn">Upload to Celebrate</button>
            }
        </>
    )
}

export default UploadContentBox
