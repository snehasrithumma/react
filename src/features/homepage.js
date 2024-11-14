import React from 'react';
import '../App.css';
import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import useFetch from './customHook/useFetch';
import Dropdown from './DROPDOWN/dropdown';
import { User, Person } from './user';

// function Home({ app }) {
export default function Home() {
    const { userEmail } = useAuth();
    const [user, setUser] = useState(userEmail);
    const [searchText, SetSearchText] = useState('')
    const [checked, setChecked] = useReducer((checked) => !checked, false);
    const [posts, setPosts] = useState([
        { title: 'post one', body: 'This is post one' },
        { title: 'post Two', body: 'This is post two' }
    ]);

    useEffect(() => {

        const user1 = new User('sneha', 1, 'sneha@gmail.com')

        console.log(user1.login())
        console.log(user1.greet())

        const person = new Person('sasha', 1)
        console.log(person.welcome())
        console.log(person.logout())
        // console.log(`hello ${user}`)
        getData()
    }, [user])

    const { contentList, loading, error } = useFetch('http://localhost:8080/api/content', 3, 100);
    // console.log(contentList, loading, error)

    async function createPosts(post) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(post);
            }, 2000);
        });
    }

    // let response = fetch('https://jsonplaceholder.typicode.com/comments?postId=1');
    // response.then(data => data.json()).then(data => console.log(data))

    const getData = async () => {
        let response = await fetch('https://jsonplaceholder.typicode.com/comments?postId=1');
        let data = await response.json();
        console.log(data)
    }


    const lama = async () => {
        await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "tinyllama",
                prompt: "why is the sky blue?",
                stream: true
            })
        })
            .then(response => {
                const reader = response.body.getReader();
                const decoder = new TextDecoder("utf-8");

                let fullResponse = "";  // To store the complete response text

                function processChunk({ done, value }) {
                    if (done) {
                        console.log("Stream complete");
                        console.log("Full response:", fullResponse);
                        return;
                    }

                    // Decode the chunk and split by newline to get each JSON object
                    const chunk = decoder.decode(value, { stream: true });
                    const messages = chunk.trim().split("\n");

                    // Process each message
                    messages.forEach(message => {
                        try {
                            const parsed = JSON.parse(message);
                            console.log("Received response part:", parsed.response);

                            // Append to the full response
                            fullResponse += parsed.response;
                        } catch (error) {
                            console.error("Error parsing JSON chunk:", error);
                        }
                    });

                    // Read the next chunk
                    return reader.read().then(processChunk);
                }

                return reader.read().then(processChunk);
            })
            .catch(error => console.error("Error:", error));
    }

    useEffect(() => {
        async function addPost() {
            const newPost = await createPosts({ title: 'post 3', body: 'This is post 3' });
            setPosts((oldPosts) => [...oldPosts, newPost]);
        }
        addPost();
        lama()
    }, []);

    const urlItems = [
        { id: 1, name: 'Home', url: '/' },
        { id: 2, name: 'Reducer', url: '/reducer' },
        { id: 3, name: 'Redux', url: '/redux' },
        { id: 4, name: 'Messenger', url: '/messenger' },
        { id: 5, name: 'Lazy', url: '/lazy' },
        { id: 7, name: 'Counter', url: '/Counter' },
        { id: 8, name: 'Data Fetch', url: '/data' },
        { id: 9, name: 'Time', url: '/timer' },
        { id: 10, name: 'Calculator', url: '/calculator' },
        { id: 11, name: 'AutoComplete', url: '/autoComplete' },
        { id: 12, name: 'wordle', url: '/wordle' },
        { id: 13, name: 'sudoku', url: '/sudoku' },
        { id: 14, name: 'snake', url: '/snake' },
        { id: 15, name: 'TODO Redux', url: '/withredux' },
        { id: 16, name: 'TODO Reducer', url: '/withreducer' },
        { id: 17, name: 'TODO Practice', url: '/practice' },
        { id: 18, name: 'Comments', url: '/comments' },
    ];

    const searchMatchText = () => {
        let inputText = document.getElementsByClassName('text')
        let innerHTML = inputText[0].innerText;
        console.log(innerHTML);
        var index = innerHTML.indexOf(searchText);
        if (index >= 0) {
            innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + innerHTML.substring(index, index + searchText.length) + "</span>" + innerHTML.substring(index + searchText.length);
            inputText[0].innerHTML = innerHTML;
        }
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches) {
        const theme = 'dark';
        console.log(theme)
    }

    return (
        <div className="App">
            <div>Hello {user}</div>
            <button onClick={() => setUser('Sneha')}>Sneha</button>
            <button onClick={() => setUser('Vinay')}>Vinay</button>

            <input type="checkbox" id="checkbox" value={checked} onChange={setChecked} />
            <label htmlFor="checkbox">{checked ? "Checked" : "Not Checked"}</label>

            <h2>Async-Await/Promises</h2>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}>{post.title}</li>
                ))}
            </ul>

            {contentList && contentList.length > 0 && <div>
                <h2>From Backend</h2>
                <ul>
                    {contentList.map((con) => (
                        <li key={con.id}>{con.title}</li>
                    ))}
                </ul>
            </div>}

            <div>
                <h1>List of Items</h1>
                <ul>
                    {urlItems.map(item => (
                        <li key={item.id}>
                            <Link to={item.url}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            {/* <Dropdown items={['val 1', 'val 2', 'val 3']} onSelect={handleSelect}></Dropdown> */}
            <div className='text'>The load event fires at the end of the document loading process. At this point, all of the objects in the document are in the DOM, and all the images, scripts, links and sub-frames have finished loading.

                The DOM event DOMContentLoaded will fire after the DOM for the page has been constructed, but do not wait for other resources to finish loading. This is preferred in certain cases when you do not need the full page to be loaded before initializing.</div>
            <label>TEXT:<input type='text' value={searchText} onChange={(e) => { SetSearchText(e.target.value) }} /></label><button onClick={searchMatchText}></button>
            <div className="parent-container">
                <div className="child"></div>
                <div className="child"></div>
                <div className="child"></div>
                <div className="child"></div>
                <div className="child"></div>
                <div className="child"></div>
                <div className="child"></div>
            </div>
        </div>
    );
}