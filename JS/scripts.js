const form = document.getElementById('search');
const input = document.getElementById('input-show');
const showContainer = document.getElementById('show-container');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;
//    console.log(url);
    showContainer.innerHTML = 'Ootappa hetki...';

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
    
    function populateShows(shows) {
        if (shows.length === 0) {
            showContainer.innerHTML = 'No shows found.';
            return;
        } else {
            console.log = 'Found ' + shows.length + ' shows.';
        }
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
            summary.innerHTML = DOMPurify.sanitize(show?.summary || 'No summary available.');
            info.appendChild(title);
            info.appendChild(summary);
            showDiv.appendChild(img);
            showDiv.appendChild(info);
            
            showContainer.appendChild(showDiv);
        }
        )
        
    }


})