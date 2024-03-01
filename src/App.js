import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Form, Button, Input, Typography } from "antd";
// import { FallOutlined } from "@ant-design/icons";

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

  // <Title level={2} style={colors}>
  //           Some thing went wroung <FallOutlined />
  //         </Title>

  const [falut, setfault] = useState("");
  const [ans, setAns] = useState("");
  const [movies, setMovies] = useState("");
  const [imagesURL, setImageURL] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fecthing(movies);
    setMovies(" ");
  };

  const { Title } = Typography;

  const colors = {
    color: "white",
  };

  return (
    <div className="App bg-black one">
      <div class="full-black-bg">
        <img src={imagesURL} class="img-fluid" alt="Responsive image" />
      </div>

      <div class="paras">
        <div className="thee">
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
        </div>

        {ans.Response === "True" ? (
          <main className="main_content">
            <Title style={{ color: "white" }}>{ans.Title}</Title>

            <Title style={colors} level={4}>
              {ans.Plot}
            </Title>

            <Title level={4} style={colors}>
              Director : {ans.Director}
            </Title>

            <Title level={4} style={colors}>
              {" "}
              Writer : {ans.Writer}
            </Title>

            {ans.Response === "True" ? (
              <Title level={4} style={colors}>
                IMDb Rating : {ans.Response ? ans.Ratings[0].Value : null}
              </Title>
            ) : (
              alert("enter movie name proprly")
            )}

            <Title level={4} style={colors}>
              RunTime : {ans.Runtime}
            </Title>

            <Title level={4} style={colors}>
              {" "}
              Genre : {ans.Genre}
            </Title>

            <Title level={4} style={colors}>
              Released : {ans.Released}
            </Title>
          </main>
        ) : null}
      </div>
    </div>
  );
}

export default App;
