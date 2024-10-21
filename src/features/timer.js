import React, { useState, useEffect } from "react";

export default function Timer() {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setCharacters([]);
            setIsLoading(true);
            try {
                let request = await fetch(
                    "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/656c61"
                );
                let word = await request.text();
                slow(word);
                setIsLoading(false);
            } catch (error) {
                setCharacters([]);
                setIsLoading(false);
            }
        };
        getData();
    }, []);

    const slow = (word) => {
        let i = 0;
        const typeNextCharacter = () => {
            if (i < word.length) {
                let words = word.slice(0, i + 1)
                setCharacters([...words]);
                i++;
                setTimeout(typeNextCharacter, 500);
            }
        };

        typeNextCharacter(); // Start the typing effect
    };

    return (<div>
        {isLoading ? (
            <div>Loading...</div>
        ) : (
            <ul>
                {characters.map((char, index) => (
                    <li key={index}>{char}</li>
                ))}
            </ul>
        )}
    </div>);
}



// let chars = [];
// document.querySelectorAll('code[data-class^="23"] div[data-tag$="93"] span[data-id*="21"] i.char').forEach(el => {
//   chars.push(el.getAttribute('value'));
// });
// console.log(chars.join(''));
