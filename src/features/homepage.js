import React from "react";
import "../App.css";
import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import useFetch from "./customHook/useFetch";
import Dropdown from "./DROPDOWN/dropdown";
import { User, Person } from "./user";

// function Home({ app }) {
export default function Home() {
  const { userEmail } = useAuth();
  const [user, setUser] = useState(userEmail);
  const [searchText, SetSearchText] = useState("");
  const [posts, setPosts] = useState([
    { title: "post one", body: "This is post one" },
    { title: "post Two", body: "This is post two" },
  ]);

  useEffect(() => {
    const user1 = new User(userEmail, 1, userEmail);

    console.log(user1.login());
    console.log(user1.greet());
  }, [user]);
  // const { contentList, loading, error } = useFetch('http://localhost:8080/api/content', 3, 100)
  async function createPosts(post) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(post);
      }, 2000);
    });
  }
  let response = fetch(
    "https://jsonplaceholder.typicode.com/comments?postId=1"
  );
  response.then((data) => data.json()).then((data) => console.log(data));

  const lama = async () => {
    await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tinyllama",
        prompt: "why is the sky blue?",
        stream: true,
      }),
    })
      .then((response) => {
        let reponseRecieved = "";
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        function processChunk({ done, value }) {
          if (done) {
            console.log("Full response:", reponseRecieved);
            return;
          }
          const chunk = decoder.decode(value, { stream: true });
          const messages = chunk.trim().split("\n");
          messages.forEach((message) => {
            try {
              let value = JSON.parse(message);
              reponseRecieved += value.response;
            } catch (error) {
              console.error("Error parsing JSON chunk:", error);
            }
          });
          return reader.read().then(processChunk);
        }
        return reader.read().then(processChunk);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    (async () => {
      const newPost = await createPosts({
        title: "post 3",
        body: "This is post 3",
      });
      setPosts((oldPosts) => [...oldPosts, newPost]);
    })();
    lama();
  }, []);

  const urlItems = [
    { id: 2, label: "Reducer", url: "/reducer" },
    { id: 3, label: "Redux", url: "/redux" },
    { id: 4, label: "Messenger", url: "/messenger" },
    { id: 5, label: "Lazy", url: "/lazy" },
    { id: 7, label: "Counter", url: "/Counter" },
    { id: 8, label: "Data Fetch", url: "/data" },
    { id: 9, label: "Time", url: "/timer" },
    { id: 17, label: "TODO Practice", url: "/practice" },
    { id: 18, label: "Comments", url: "/comments" },
  ];

  const searchMatchText = () => {
    let inputText = document.getElementsByClassName("text");
    let innerHTML = inputText[0].innerText;
    console.log(innerHTML);
    var index = innerHTML.indexOf(searchText);
    if (index >= 0) {
      innerHTML =
        innerHTML.substring(0, index) +
        "<span class='highlight'>" +
        innerHTML.substring(index, index + searchText.length) +
        "</span>" +
        innerHTML.substring(index + searchText.length);
      inputText[0].innerHTML = innerHTML;
    }
  };
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme:dark)").matches
  ) {
    const theme = "dark";
    console.log(theme);
  }

  return (
    <div className="App">
      <div>Hello {user}</div>

      <div className="wrapper">
        <ul
          style={{
            textAlign: "left",
          }}
        >
          {urlItems.map((item) => (
            <li key={item.id} style={{ padding: "3px" }}>
              <Link to={item.url}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="text">
        <span>
          The load event fires at the end of the document loading process. At
          this point, all of the objects in the document are in the DOM, and all
          the images, scripts, links and sub-frames have finished loading. The
          DOM event DOMContentLoaded will fire after the DOM for the page has
          been constructed, but do not wait for other resources to finish
          loading. This is preferred in certain cases when you do not need the
          full page to be loaded before initializing.
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <label>TEXT:</label>
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              SetSearchText(e.target.value);
            }}
          />
          <button onClick={searchMatchText}>Search</button>
        </div>
      </div>
      {/* <div className="parent-container">
                   <div className="child"></div>
                <div className="child"></div>
                <div className="child"></div>
                <div className="child"></div>
                <div className="child"></div>
                <div className="child"></div>
                <div className="child"></div>
            </div> */}
    </div>
  );
}
