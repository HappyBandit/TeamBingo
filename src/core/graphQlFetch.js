import fetch from './fetch';

// Unify the GraphQl fetching to one spot
async function graphQlFetch (query) {
    const resp = await fetch('/graphql', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
        }),
        credentials: 'include',
    });
    const { data } = await resp.json();
    if (!data) throw new Error('Failed to update.');
    return data;
}

export default graphQlFetch;
