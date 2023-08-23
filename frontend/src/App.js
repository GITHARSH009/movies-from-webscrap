import React,{useEffect,useState} from 'react';
import './App.css';
import axios from "axios";


function App() {
    const [books,setbooks]=useState([]);
    const [textbooks,settextbooks]=useState([]);
    const [movie,setmovie]=useState([]);
    const [games,setgames]=useState([]);

    const fetch=async()=>{
       const {data}=await axios.get('http://localhost:8095/books');
       setbooks(data);
     };
     const fetch2=async()=>{
       const {data}=await axios.get('http://localhost:8095/textbooks');
       settextbooks(data);
     };
     const fetch3=async()=>{
       const {data}=await axios.get('http://localhost:8095/movies');
       setmovie(data);
     };
     const fetch4=async()=>{
       const {data}=await axios.get('http://localhost:8095/games');
       setgames(data);
     };


    useEffect(()=>{
     fetch();
     fetch2();
     fetch3();
     fetch4();
    },[])

  return (
    <>
    <h1 className='heading'>Information Collected</h1>
    <h1 style={{"marginLeft":"1.8rem","color":"darkblue"}}>Books</h1>
    <div className="App">
       {
        books.map((item , index)=>(
          <div className='Rowi'>
           <div className='har'>
          <img className='cardi' src={item.img} alt="cover"/>
           </div>
          <h2>{item.title}</h2>
          </div>
        ))
       }
    </div>
    <h1 style={{"marginLeft":"1.8rem","color":"darkblue"}}>Textbooks</h1>
    <div className="App">
    {
        textbooks.map((item , index)=>(
          <div className='Rowi'>
           <div className='har'>
          <img className='cardi' src={item.img} alt="cover"/>
           </div>
          <h2>{item.title}</h2>
          </div>
        ))
       }
    </div>
    <h1 style={{"marginLeft":"1.8rem","color":"darkblue"}}>Movies</h1>
    <div className="App">
       {
        movie.map((item , index)=>(
          <div className='Rowi'>
           <div className='har'>
          <img className='cardi' src={item.img} alt="cover"/>
           </div>
          <h2>{item.title}</h2>
          </div>
        ))
       }
    </div>
    <h1 style={{"marginLeft":"1.8rem","color":"darkblue"}}>Games</h1>
    <div className="App">
       {
        games.map((item , index)=>(
          <div className='Rowi'>
           <div className='har'>
          <img className='cardi' src={item.img} alt="cover"/>
           </div>
          <h2>{item.title}</h2>
          </div>
        ))
       }
    </div>
    </>
  );
}

export default App;
