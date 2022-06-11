export const submitEmail = (email) => {
    const url = '/.netlify/functions/saveEmail';

    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email
        })
    });
}

export const submitVote = (vote, walletAddress, uid) => {
    const url = '/.netlify/functions/submitVote';
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            vote,
            walletAddress,
            uid
        })
    });
}

export const getVoxmonPreviews = () => {
    const url = '/.netlify/functions/preview';
    
    return fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
}

export const getVoxmon = (id) => {
    const url = `/.netlify/functions/voxmon?id=${id}`;

    return fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
}

export const getToken = (id) => {
    const url = `/.netlify/functions/token/${id}`;
    return fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
}