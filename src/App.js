import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Form, Button, Input } from "antd";

function App() {
  async function fecthing(movieTitle) {
    try {
      const encodedMovieTitle = encodeURIComponent(movieTitle);
      const apiUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=221e524a&t=${encodedMovieTitle}`;
      let final = await fetch(apiUrl);
      if (!final.ok) {
        throw new Error("Enter Movie name properly");
      }

      let ans = await final.json();
      setAns(ans);
      console.log(ans);
      let imageUrl = await ans.Poster;
      setImageURL(imageUrl);
    } catch (err) {
      setfault(err.message);
    }
  }

  const [falut, setfault] = useState("");
  const [ans, setAns] = useState("");
  const [movies, setMovies] = useState("");
  const [imagesURL, setImageURL] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fecthing(movies);
    setMovies(" ");
  };

  return (
    <div className="App bg-black one">
      <div>
        <div class="full-black-bg">
          <img src={imagesURL} class="img-fluid" alt="Responsive image" />
        </div>

        <div class="paras">
          <div className="form">
            <Form onFinish={handleSubmit} autoFocus>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please enter Movie name!",
                  },
                ]}
                style={{ display: "inline-block", marginRight: "8px" }}
              >
                <Input
                  placeholder="enter movie name"
                  value={movies}
                  onChange={(e) => setMovies(e.target.value)}
                />
              </Form.Item>

              <Form.Item style={{ display: "inline-block" }}>
                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>

          {ans.Response === "True" ? (
            <main className="main_content">
              <div>
                <h2 class="lead display-4">{ans.Title}</h2>
              </div>

              <div>
                <p className="lead">{ans.Plot}</p>
              </div>

              <div>
                <p>Director : {ans.Director}</p>
                <p>Writer : {ans.Writer}</p>
              </div>

              {ans.Response === "True" ? (
                <div>
                  <h6>
                    IMDb Rating : {ans.Response ? ans.Ratings[0].Value : null}
                  </h6>
                </div>
              ) : (
                alert("enter movie name proprly")
              )}

              <div>
                <h6>RunTime : {ans.Runtime}</h6>
              </div>

              <div>
                <p>Genre : {ans.Genre}</p>
              </div>

              <div>
                <p>Released : {ans.Released}</p>
              </div>
            </main>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
