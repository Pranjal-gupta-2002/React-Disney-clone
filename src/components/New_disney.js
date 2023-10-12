import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectnewDisney, setMovies } from '../features/movies/movieSlice';
function New_disney() {

  const movies = useSelector(selectnewDisney);
  return (
    <Container>
      <h4>New To Disney+ !!</h4>
      <Content>
        {
          movies && movies.map((movie, key) => (
            <Wrap key={key}>
              {movie.id}
              <Link to={"/detail/" + movie.id}>
                <img src={movie.cardImg} alt={movies.title} />
              </Link>
            </Wrap>
          ))
        }
      </Content> 
    </Container>
  )
}

const Container = styled.div`
   padding: 0px 0px 26px;
  `;
const Content = styled.div`
   display: grid;
   grid-gap: 25px;
   padding: 10px;
   grid-template-columns: repeat(4,minmax(0,1fr));
  
   @media (max-width: 768px){
      grid-template-columns: repeat(2,minmax(0,1fr));
   }
  `;


const Wrap = styled.div`
   padding-top: 56.25%;
   border-radius: 10px;
   box-shadow: 0 26px 30px -10px rgba(0, 0, 0), 0 16px 10px -10px rgba(0, 0, 0);
   overflow: hidden;
   cursor: pointer;
   position: relative;
   transition: all 250ms cubic-bezier(0.25,0.46,0.45,0.94);
   border: 3px solid rgba( 249,249,249,0.1);
  
   img{
      display: block;
      inset: 0px;
      height: 100%;
      object-fit: cover;
      opacity: 1;
      position: absolute;
      transition: opacity 500ms ease-in-out;
      width: 100%;
      z-index: 1;
   }
  
   &:hover{
      box-shadow: 0 26px 30px -10px rgba(0, 0, 0), 0 16px 10px -10px rgba(0, 0, 0);
      transform: scale(1.05);
      border-color: rgba( 249,249,249,0.8);
   }
  `;

export default New_disney;