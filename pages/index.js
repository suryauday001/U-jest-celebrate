import Head from 'next/head'
import Image from 'next/image'

import { collection, addDoc, setDoc, doc, docs, getDocs, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState, Component } from 'react';
import firebaseApp from '../firebaseConfig'
import { getFirestore, onSnapshot } from "firebase/firestore";
import { delBasePath } from 'next/dist/shared/lib/router/router';
import Masonry from 'react-masonry-css'
import UploadContentBox from '../component/UploadContentBox';


const db = getFirestore();



export default function Home() {

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "ujustcelebrate");
  const [newLike, setNewLike] = useState(0);
  const [singleDetails, setSingleDetails] = useState(null);

  const myBreakpointsAndCols = {
    default: 4,
    1100: 3,
    700: 2,
    500: 2
  };

  function singleDetailsfun(data) {

    setSingleDetails(data);
    console.log(singleDetails);
  }

  function closeimagebox() {
    setSingleDetails(null);
  }
  const updateUser = async (id, like) => {
    console.log(id);
    const userDoc = doc(db, "ujustcelebrate", id);
    const newFields = { like: like + 1 };
    await updateDoc(userDoc, newFields);
  };

  useEffect(() => {
    const getContent = async () => {
      onSnapshot(collection(db, "ujustcelebrate"), (snapshot) => {
        console.log("Suraj", snapshot);
        setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
    }
    getContent();
  }, []);

  return (
    <section className="page-container">
      {/* <img src="/backgroundimage.png"/> */}
      <div className="pageBg">
        <Image src="/backgroundimage.png" className="fixedbg" layout="fill" objectFit="cover" objectPosition="center" />
      </div>
      <div className="container">
        <div className="headermain">
          <div><Image src="/logo-t.png" height="54px" width="70px" layout="" /></div>
          <h1>#ujustcelebrate</h1>
        </div>

        <Masonry
          breakpointCols={myBreakpointsAndCols}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {users.map((user, i) => {
            return (
              <div className="cardBlock" key={i}  >
                {/* <Image
                  //loader={myLoader}
                  src="/heart.png"
                  alt="Picture of the author"
                  width={500}
                  height={500}
                /> */}
                <img src={user.imageUrl} onClick={() => singleDetailsfun(user)} />
                <div className="hoverCard">
                  <div className="actionbar">
                    <h2># {user.hashtag}</h2>
                  </div>

                </div>
                <div className="heartBtn"><button onClick={() => {
                  updateUser(user.id, user.like);
                }}><Image src="/heart.png" height="20px" width="20px" /></button><div>{user.like}</div></div>

              </div>
            );
          })}
        </Masonry>
        <UploadContentBox />

        {/* <UploadImageBox /> */}
        {
          singleDetails ?
            <div className="imagepopUp">
              <div className="imageBg" onClick={() => closeimagebox()}></div>
              <div className="imageBox">
                <img src={singleDetails.imageUrl} />
              </div>
              <div className="hoverCard">
                <div className="actionbar">
                  <h2># {singleDetails.hashtag}</h2>
                </div>

              </div>
            </div>
            : null
        }

      </div>
    </section>
  )
}
