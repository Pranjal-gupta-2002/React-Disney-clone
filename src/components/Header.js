import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { auth, provider } from '../firebase'
import { selectUserName, selectUserEmail, selectUserPhoto, setUserLoginDetails, setSignOutState } from '../features/user/userSlice'


function Header(props) {
    const dispatch = useDispatch()
    const history = useNavigate()
    const username = useSelector(selectUserName)
    const userPhoto = useSelector(selectUserPhoto)


    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user)
                history('/home')
            }
        })
    }, [username])

    const handleAuth = () => {
        if (!username) {
            auth.signInWithPopup(provider)
                .then((result) => {
                    setUser(result.user)
                })
                .catch((error) => {
                    alert(error)
                })
        }
        else if(username){
            auth.signOut().then(()=>{
                dispatch(setSignOutState())
                history('/')
            }).catch((error)=>{
                alert(error.message)
            })
        }

    };

    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            })
        );
    };

    return (
        <Nav>
            <Logo>
                <img src="/images/logo.svg" alt="" />
            </Logo>

            {
                !username ?
                    <Login onClick={handleAuth}>Login</Login> :
                    <>
                        <NavMenu>
                            <Link to="/home">
                                <img src="/images/home-icon.svg" alt="" />
                                <span>HOME</span>
                            </Link>
                            <Link to="/search">
                                <img src="/images/search-icon.svg" alt="" />
                                <span>SEARCH</span>
                            </Link>
                            <Link to="/watchlist">
                                <img src="/images/watchlist-icon.svg" alt="" />
                                <span>WATCHLIST</span>
                            </Link>
                            <Link to="/original">
                                <img src="/images/original-icon.svg" alt="" />
                                <span>ORIGINAL</span>
                            </Link>
                            <Link to="/movie">
                                <img src="/images/movie-icon.svg" alt="" />
                                <span>MOVIES</span>
                            </Link>
                            <Link to="/series">
                                <img src="/images/series-icon.svg" alt="" />
                                <span>SERIES</span>
                            </Link>
                        </NavMenu>
                        <SignOut>
                            <UserImg src={userPhoto} referrerPolicy="no-referrer"></UserImg>
                            <DropDown>
                                <span onClick={handleAuth}>Sign Out</span>
                            </DropDown>
                        </SignOut>
                    </>
            }

        </Nav>
    )
}

const Nav = styled.nav`
 position: fixed;
 top: 0;
 height: 70px;
 right: 0;
 left: 0;
 background-color: #090b13;
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 0 36px;
 z-index: 3;
`;

const Logo = styled.a`
 padding: 0;
 width:80px;
 margin-top: 4px;
 max-height: 70px;
 font-size: 0;
 display: inline-block;

 img{
    display: block;
    min-width: 80px;
    width: 100%;
 }
`;

const NavMenu = styled.div`
 display: flex;
 align-items: center;
 flex-flow: row nowrap;
 justify-content: flex-end;
 height: 100%;
 margin: 0 ;
 padding: 12px 0 0 0 ;
 position: relative;
 margin:0 auto 0 25px;

 a{
    display: flex;
    align-items: center;
    padding: 0 12px;

    img{
        height: 20px;
        min-width: 20px;
        width: 20px;
        z-index: auto;
    }
    span{
        color: rgba(249,249,249);
        font-size: 13px;
        letter-spacing: 1.42px;
        line-height: 1.08;
        padding: 2px 0;
        white-space: nowrap;
        position: relative;
        top: 1px;
    
    &:before{
        position: absolute;
        background-color: rgba(249,249,249);
        border-radius: 0px 0px 4px 4px ;
        bottom: -6px;
        content: "";
        height: 2px;
        opacity: 0;
        right: 0;
        left: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25,0.46,0.45,0.94); 
        visibility: hidden;
        width: auto;

    }
 }
 &:hover{
    span:before{
        visibility:visible ;
        transform: scaleX(1);
        opacity: 1 !important;
    }

 }

}
 @media (max-width : 768px) {
    display: none;
}
`;


const Login = styled.a`
 background-color: rgba(0,0,0,0.6);
 padding: 8px 16px;
 text-transform: uppercase;
 letter-spacing: 1.5px;
 border: 1px solid #f9f9f9;
 border-radius: 4px;
 transition: all 0.2s ease-out;

 &:hover{
    background-color: #f9f9f9;
    color: #000;
 }
`;

const UserImg = styled.img`
 height: 100%;

`;

const DropDown = styled.div`
 position: absolute;
 top: 48px;
 right: 0;
 background: rgba(19,19,19);
 border: 1px solid rgba(151,151,151,0.34);
 border-radius: 4px;
 box-shadow: rgba(0 0 0 / 50%) 0px 0px 18px 0px;
 padding: 10px;
 font-size: 14px;
 letter-spacing: 3px;
 width: 101px;
 opacity: 0;
`;


const SignOut = styled.div`
 position: relative;
 height: 48px;
 width: 48px;
 display: flex;
 cursor: pointer;
 align-items: center;
 justify-content: center;

 ${UserImg}{
    border-radius: 50%;
    width: 100%;
    height: 100%;
 }

 &:hover{
     ${DropDown}{
        opacity: 1;
        transition-duration: 1s;
     }
 }
`;
export default Header