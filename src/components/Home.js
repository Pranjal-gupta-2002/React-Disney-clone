import styled from "styled-components";

import React from 'react'
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import New_disney from "./New_disney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from '../firebase';
import { setMovies } from "../features/movies/movieSlice";
import { selectUserName } from "../features/user/userSlice";


function Home(props) {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName)

  let recommends = []
  let newDisneys = []
  let originals = []
  let trending = []

  useEffect(() => {
    db.collection('Movies').onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        console.log(recommends)
        console.log(trending)
        console.log(newDisneys)
        console.log(originals)
        switch (doc.data().type) {
          case 'recommend':
            recommends = [...recommends, { id: doc.id, ...doc.data() }]
            break;
          case 'new':
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }]
            break;
          case 'original':
            originals = [...originals, { id: doc.id, ...doc.data() }]
            break;
          case 'trending':
            trending = [...trending, { id: doc.id, ...doc.data() }]
            break;
        }
      })

      dispatch(setMovies({
        recommend: recommends,
        newDisney: newDisneys,
        original: originals,
        trending: trending,
      })
      );
    });
  }, [userName])

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <New_disney />
      <Originals />
      <Trending />
    </Container>
  )
}


const Container = styled.main`
 position: relative;
 min-height: calc(100vh - 250px);
 overflow-x: hidden;
 display: block;
 top: 72px;
 padding: 0 calc(3.5vw * 5px);
 
 &:after{
     background: url('/images/home-background.png') center center / cover no-repeat fixed;
     content: '';
     position: absolute;
     inset: 0px;
     opacity: 1;
     z-index: -1;
 }
`;
export default Home