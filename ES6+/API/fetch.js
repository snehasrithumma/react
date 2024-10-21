// use pure promise syntax
async function getUsers(names) {
    let promises = names.map((user) => {
        return fetch(`https://api.github.com/users/${user}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return null; // If the response is not OK (e.g., 404)
                }
            })
            .catch(() => {
                return null; // Handle fetch error (e.g., network issues)
            });
    });

    return Promise.all(promises); // Returns a promise that resolves when all users' data is fetched
}

// await
async function getUsers2(names) {
    let info = [];
    for (let user of names) {
        try {
            let response = await fetch(`https://api.github.com/users/${user}`);
            if (response.ok) {
                let data = await response.json();
                info.push(data);
            } else {
                info.push(null);
            }
        } catch (error) {
            info.push(null);
        }
    }
    return info;
}
