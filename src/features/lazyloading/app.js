import React, { useState, Suspense, lazy } from 'react';
import Loading from './loading.js';

const MarkdownPreview = lazy(() => delayForDemo(import('./MarkdownPreview.js')));

// Add a fixed delay so you can see the loading state
async function delayForDemo(promise) {
    await new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
    return promise;
}

export default function MarkdownEditor() {
    const [showPreview, setShowPreview] = useState(false);
    const [markdown, setMarkdown] = useState('Hello, **world**!');

    // Memoization
    function memoize(func) {
        const cache = new Map();
        return async function (...args) {
            const key = JSON.stringify(args);
            if (cache.has(key)) {
                console.log('from cache')
                return cache.get(key)
            }
            else {
                console.log('Computed new cache')
                let result = await func(...args);
                cache.set(key, result)
                return result;
            }
        }
    }

    const slowFunction = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(num * 100)
            }, 5000)

        })
    }

    const memoizedFunction = memoize(slowFunction);
    (async () => {
        console.log(await memoizedFunction(5)); // Outputs: Computed new cache\n 500
        console.log(await memoizedFunction(5)); // Outputs: from cache\n 500
    })();

    return (
        <>
            <textarea value={markdown} onChange={e => setMarkdown(e.target.value)} />
            <label>
                <input type="checkbox" checked={showPreview} onChange={e => setShowPreview(e.target.checked)} />
                Show preview
            </label>
            <hr />
            {showPreview && (
                <Suspense fallback={<Loading />}>
                    <h2>Preview</h2>
                    <MarkdownPreview markdown={markdown} />
                </Suspense>
            )}
        </>
    );
}