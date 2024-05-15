import "./App.css";
import { useState, useEffect } from "react";
import { Form, Button, Input, Typography, Image } from "antd";


function App() {

  const [falut, setfault] = useState("");
  const [ans, setAns] = useState("");
  const [movies, setMovies] = useState("");
  const [imagesURL, setImageURL] = useState("");

  async function fecthing(movieTitle) {
    try {
      const encodedMovieTitle = encodeURIComponent(movieTitle);
      const apiUrl = `https://www.omdbapi.com/?i=tt3896198&apikey=221e524a&t=${encodedMovieTitle}`;
      let final = await fetch(apiUrl);
      if (!final.ok) {
        throw new Error("Enter Movie name properly");
      }

      let ans = await final.json();
      setAns(ans);
      let imageUrl = await ans?.Poster;
      setImageURL(imageUrl);
    } catch (err) {
      setfault('error in name');
    }
  }

  console.log(ans);
  const { Title } = Typography;
  const { Search } = Input;

  const colors = {
    color: "grey",
    letterSpacing : '1px',
  };

  const ans_color = {
    color:'smokewhite'
  }

  const handleSearch = (val) => {
    fecthing(val);
  };

  return (
    <div className="App bg-black one">
      <div class="full-black-bg">
        <img src={imagesURL} class="img-fluid" alt="Responsive image" />
      </div>

      <div class="paras">
        <div className="form_outline">
          <div className="form">
            <Search
              placeholder="search movies"
              allowClear
              enterButton="Review"
              size="large"
              onSearch={handleSearch}
              onChange={(e) => setMovies(e.target.value) || ''}
            />
          </div>
        </div>
        </div>

        <div className="movie_contant" >

        {ans.Response === "True" ? (
          <main className="main_content">
            <Title style={{ color: "white" ,fontFamily:'monospace'}}>{ans.Title}</Title>

            <Title style={colors} level={4}>
              <span style={ans_color}>{ans.Plot}</span>
            </Title>

            <Title level={4} style={colors}>
              Director : <span style={ans_color}>{ans.Director}</span>
            </Title>

            <Title level={4} style={colors}>
              {" "}
              Writer :  <span style={ans_color}>{ans.Writer}</span>
            </Title>

            {ans.Response === "True" ? (
              <Title level={4} style={colors}  >
                IMDb Rating : {ans.Response ? <span style={ans_color}> {ans.Ratings[0]?.Value} </span>: null}
              </Title>
            ) : (
              alert("enter movie name proprly")
            )}

            <Title level={4} style={colors}>
              RunTime :    <span style={ans_color}> {ans.Runtime} </span>
            </Title>

            <Title level={4} style={colors}>
              {" "}
              Genre :   <span style= {ans_color}> {ans.Genre} </span>
            </Title>

            <Title level={4} style={colors}>
              Released :    <span style={ans_color}>{ans.Released}</span>
            </Title>
          </main>
        ) :
        <div className="error_image_div">  
          <Image width={800} src="/error.jpg" className="error_image" preview={false}/>
        </div>
      }
      </div>
      </div>
  );
}

export default App;
