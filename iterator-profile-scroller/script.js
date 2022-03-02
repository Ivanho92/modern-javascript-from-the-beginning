async function getProfiles() {
    const response = await fetch('https://randomuser.me/api/?results=5');
    if (!response.status === 'ok') throw new Error('Something went wrong:' + response.status);
    const profiles = await response.json();
    return profiles.results;
}

function profileIterator(profiles) {
    let nextIndex = 0;

    return {
        next: () => {
            return nextIndex < profiles.length ?
            { value: profiles[nextIndex++], done: false } :
            { done: true }
        }
    }
}

let profiles;
getProfiles()
    .then(data => {
        profiles = profileIterator(data);
        displayNextProfile();
    })
    .catch(error => console.error(error));



function displayNextProfile() {
    const currentProfile = profiles.next().value;

    if (currentProfile !== undefined) {
        document.getElementById('profile-img').setAttribute('src', currentProfile.picture.large);
        document.getElementById('profile-name').textContent = currentProfile.name.first;
        document.getElementById('profile-age').textContent = currentProfile.dob.age;
        document.getElementById('profile-location').textContent = currentProfile.location.city;
    } else {
        document.getElementById('profile-info').innerHTML = `
            <p class="alert alert-danger mt-4">No more profiles for now ...</p>
        `;
        document.getElementById('next-profile').setAttribute('disabled',null);
        const btn = document.createElement('button');
        btn.className = 'btn btn-danger mt-3';
        btn.innerText = 'Start again';
        btn.id = 'reset';
        document.getElementById('main').append(btn);
        document.getElementById('reset').addEventListener('click', e => window.location.reload());
    }
}

document.getElementById('next-profile').addEventListener('click', displayNextProfile);