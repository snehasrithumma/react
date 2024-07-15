import '../App.css';
import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';

// function Home({ app }) {
export default function Home() {
    const [what, setWhat] = useState('Sasha');
    const [checked, setChecked] = useReducer((checked) => !checked, false);
    const [posts, setPosts] = useState([
        { title: 'post one', body: 'This is post one' },
        { title: 'post Two', body: 'This is post two' }
    ]);

    useEffect(() => {
        console.log(`hello ${what}`)
    }, [what])

    async function createPosts(post) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(post);
            }, 2000);
        });
    }


    async function addPost() {
        const newPost = await createPosts({ title: 'post 3', body: 'This is post 3' });
        setPosts((prevPosts) => [...prevPosts, newPost]);
    }

    useEffect(() => {
        addPost();
    }, []);

    const urlItems = [
        { id: 1, name: 'Home', url: '/' },
        { id: 2, name: 'Reducer', url: '/reducer' },
        { id: 3, name: 'Redux', url: '/redux' },
        { id: 4, name: 'Messenger', url: '/messenger' },
    ];

    return (
        <div className="App">
            <div>Hello {what}</div>
            <button onClick={() => setWhat('Sneha')}>Sneha</button>
            <button onClick={() => setWhat('Vinay')}>Vinay</button>

            <input type="checkbox" value={checked} onChange={setChecked} />
            <label>{checked ? "Checked" : "Not Checked"}</label>

            <h2>Async-Await/Promises</h2>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}>{post.title}</li>
                ))}
            </ul>

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
        </div>
    );
}
