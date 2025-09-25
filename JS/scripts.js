const form = document.getElementById('search');
const input = document.getElementById('input-show');
const showContainer = document.querySelector('.show-container');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const q = input.value.trim();
//    if (!q) return;
    const url = 'https://api.tvmaze.com/search/shows?q=' + q;
    console.log('Fetching data from:', url);
    showContainer.innerHTML = 'Hold on...';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error fetching data: ' + response.statusText);
        const data = await response.json();
        showContainer.innerHTML = '';
        populateShows(data);
    } catch (error) {
        showContainer.innerHTML = 'Error fetching data.';
        console.error(error);
    }
})    
function populateShows(shows) {
    if (shows.length === 0) {
        showContainer.innerHTML = 'No shows found.';
        return;
    };
    shows.forEach(item => {
        const show = item.show;
        const showDiv = document.createElement('div');
        showDiv.className = 'show-data';
        const img = document.createElement('img');
        img.src = show?.image?.medium || '/img/no-image.png';
        img.alt = show.name;
        const info = document.createElement('div');
        info.className = 'show-info';
        const title = document.createElement('h1');
        title.textContent = show?.name ?? 'No title available';
        const summary = document.createElement('div');
        summary.innerHTML = show?.summary || 'No summary available.';
        info.appendChild(title);
        info.appendChild(summary);
        showDiv.appendChild(img);
        showDiv.appendChild(info);
        showContainer.appendChild(showDiv);
    }
    )
    
}



// default search on page load
/* document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search');
  const input = document.getElementById('input-show');
  input.value = 'tuntematon';
  form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
}); */
