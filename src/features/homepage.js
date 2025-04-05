import React from 'react';
import '../App.css';
import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import useFetch from './customHook/useFetch';
import Dropdown from './DROPDOWN/dropdown';
import { User, Person } from './user';
import RegularList from '../Lists/List';
import SmallListItem from '../Lists/smallList';
import LargeListItem from '../Lists/LargeListItems';

/* global __IS_DEV__ */

const listItems = [
    {
      "postId": 1,
      "id": 1,
      "name": "id labore ex et quam laborum",
      "email": "Eliseo@gardner.biz",
      "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
    },
    {
      "postId": 1,
      "id": 2,
      "name": "quo vero reiciendis velit similique earum",
      "email": "Jayne_Kuhic@sydney.com",
      "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
    },
    {
      "postId": 2,
      "id": 6,
      "name": "et fugit eligendi deleniti quidem qui sint nihil autem",
      "email": "Presley.Mueller@myrl.com",
      "body": "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in"
    },
    {
      "postId": 2,
      "id": 7,
      "name": "repellat consequatur praesentium vel minus molestias voluptatum",
      "email": "Dallas@ole.me",
      "body": "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor"
    },
    {
      "postId": 2,
      "id": 8,
      "name": "et omnis dolorem",
      "email": "Mallory_Kunze@marie.org",
      "body": "ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque"
    },
    {
      "postId": 2,
      "id": 9,
      "name": "provident id voluptas",
      "email": "Meghan_Littel@rene.us",
      "body": "sapiente assumenda molestiae atque\nadipisci laborum distinctio aperiam et ab ut omnis\net occaecati aspernatur odit sit rem expedita\nquas enim ipsam minus"
    },
    {
      "postId": 2,
      "id": 10,
      "name": "eaque et deleniti atque tenetur ut quo ut",
      "email": "Carmen_Keeling@caroline.name",
      "body": "voluptate iusto quis nobis reprehenderit ipsum amet nulla\nquia quas dolores velit et non\naut quia necessitatibus\nnostrum quaerat nulla et accusamus nisi facilis"
    },
    {
      "postId": 6,
      "id": 27,
      "name": "doloribus quibusdam molestiae amet illum",
      "email": "Francesco.Gleason@nella.us",
      "body": "nisi vel quas ut laborum ratione\nrerum magni eum\nunde et voluptatem saepe\nvoluptas corporis modi amet ipsam eos saepe porro"
    },
    {
      "postId": 7,
      "id": 32,
      "name": "dolorem architecto ut pariatur quae qui suscipit",
      "email": "Maria@laurel.name",
      "body": "nihil ea itaque libero illo\nofficiis quo quo dicta inventore consequatur voluptas voluptatem\ncorporis sed necessitatibus velit tempore\nrerum velit et temporibus"
    },
    {
      "postId": 7,
      "id": 33,
      "name": "voluptatum totam vel voluptate omnis",
      "email": "Jaeden.Towne@arlene.tv",
      "body": "fugit harum quae vero\nlibero unde tempore\nsoluta eaque culpa sequi quibusdam nulla id\net et necessitatibus"
    },
    {
      "postId": 8,
      "id": 40,
      "name": "non minima omnis deleniti pariatur facere quibusdam at",
      "email": "Clare.Aufderhar@nicole.ca",
      "body": "quod minus alias quos\nperferendis labore molestias quae ut ut corporis deserunt vitae\net quaerat ut et ullam unde asperiores\ncum voluptatem cumque"
    },
    {
      "postId": 9,
      "id": 41,
      "name": "voluptas deleniti ut",
      "email": "Lucio@gladys.tv",
      "body": "facere repudiandae vitae ea aut sed quo ut et\nfacere nihil ut voluptates in\nsaepe cupiditate accusantium numquam dolores\ninventore sint mollitia provident"
    },
    {
      "postId": 9,
      "id": 45,
      "name": "autem illo facilis",
      "email": "Marcia@name.biz",
      "body": "ipsum odio harum voluptatem sunt cumque et dolores\nnihil laboriosam neque commodi qui est\nquos numquam voluptatum\ncorporis quo in vitae similique cumque tempore"
    },
    {
      "postId": 10,
      "id": 46,
      "name": "dignissimos et deleniti voluptate et quod",
      "email": "Jeremy.Harann@waino.me",
      "body": "exercitationem et id quae cum omnis\nvoluptatibus accusantium et quidem\nut ipsam sint\ndoloremque illo ex atque necessitatibus sed"
    }] 

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
            .then((response) => {
                let reponseRecieved = '';
                const reader = response.body.getReader();
                const decoder = new TextDecoder("utf-8");
                function processChunk({ done, value }) {
                    if (done) {
                        console.log("Full response:", reponseRecieved);
                        return;
                    }
                    const chunk = decoder.decode(value, { stream: true });
                    const messages = chunk.trim().split("\n");
                    messages.forEach(message => {
                        try {
                            let value = JSON.parse(message);
                            reponseRecieved += value.response
                        }
                        catch (error) {
                            console.error("Error parsing JSON chunk:", error);
                        }
                    })
                    return reader.read().then(processChunk);
                }
                return reader.read().then(processChunk);
            })
            .catch(error => console.error("Error:", error));
    }

    useEffect(() => {
        (async () => {
            const newPost = await createPosts({ title: 'post 3', body: 'This is post 3' });
            setPosts((oldPosts) => [...oldPosts, newPost]);
        })();
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
            <RegularList items={listItems} resourceType='person' component={SmallListItem} />
            <RegularList items={listItems} resourceType='person' component={LargeListItem} />
        </div>
    );
}