import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { data } from "./data";


function App() {
  const [emojis, setEmojies] = useState([]);
  const [searchedEmojis, setSearchedEmojis] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "https://emojihub.herokuapp.com/api/all",
    }).then(function (response) {
      setEmojies(response.data);
      setSearchedEmojis(response.data)
    });
   
  },[]);


  const searchEmoji =(e)=>{
    const filtered = [];
    if(e.target.value.trim()!== ""){
      emojis.map(emoji=>{
        if(emoji.name.trim().includes(e.target.value.trim().toLowerCase())){
          filtered.push(emoji);
        }
        setSearchedEmojis(filtered)
      })
    }else{
      setSearchedEmojis(emojis)
    }
    }



  return (
    <div className="App">
      <header className="App-header">
        <h2>Emoji &#128123;</h2>
        <input
        onKeyUp={searchEmoji}
          style={{
            backgroundColor: "transparent",
            borderColor: "whitesmoke",
            padding: "12px",
            color: "white",
            borderRadius: "5px",
            width: "250px",
          }}
          placeholder="Search emoji"
        />
        {emojis.length === 0 && (
          <h4 style={{ marginTop: "50px" }}>Loading...</h4>
        )}

        {emojis.length !==0 && searchedEmojis.length === 0 ? <h4 style={{ marginTop: "50px" }}>No emoji found</h4>: ''}
        
        <div className="cardContainer">
          {searchedEmojis.map((emoji) => (
            <div className="card">
              <p>
                <span dangerouslySetInnerHTML={{ __html: emoji.htmlCode[0] }}></span>

              </p>
              <h6>{emoji.name}</h6>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
