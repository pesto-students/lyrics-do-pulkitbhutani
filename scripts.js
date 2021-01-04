const form = document.querySelector('.search-form');

form.addEventListener('submit', function(f){

    //remove old items from the list
    if(document.getElementById('songList').getElementsByTagName('li').length >= 1)
    {
        document.getElementById('songList').innerHTML = '';
    }

    const song = document.getElementById('song').value;
    f.preventDefault();
    console.log(song);
    fetchSuggestions(song);
})

function fetchSuggestions(song)
{

    const suggestUrl = 'https://api.lyrics.ovh/suggest/'+song;
    console.log(suggestUrl); 

    fetch(suggestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data.data);
        populateList(data.data);
    })
    .catch(function(error) {
        console.log(error);
      });

    function populateList(data){
        const songList = document.getElementById('songList');
        for (song of data){
            console.log(song);
            let li = document.createElement('li');
            li.className = 'song-li';
            let node = document.createTextNode(song.artist.name + ' - ' + song.title);
            let button = document.createElement('button');
            button.innerHTML='Show Lyrics';
            button.click(song.artist.name);
            button.className = 'lyrics-btn';
            button.id = 'lyrics-btn';
            button.value = song.artist.name + ',' + song.title;
            li.appendChild(node);
            li.appendChild(button);
            songList.appendChild(li);
        }
    }
        
}

function showLyrics()
{
    console.log(song.artist.name);
}