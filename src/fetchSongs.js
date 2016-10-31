import axios from 'axios';
function filterSongs(html) {
  let songsList = [];

  let htmlDoc = document.createElement('div');
  htmlDoc.innerHTML = html;

  let listOfLinks = htmlDoc.querySelectorAll('a');
  listOfLinks = Array.from(listOfLinks);

  songsList = listOfLinks.map(link => {
    return {
      song_title: link.innerHTML,
      song_url: link.href.replace('http://localhost:3000', 'http://localhost:9000')
    }
  });

  songsList = songsList.filter(link => link.song_title.includes('.mp3'));

  return songsList;
}

function fetchSongs() {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:9000')
    .then(response => {
      const songs = filterSongs(response.data);
      return resolve(songs);
    })
    .catch(err => reject(err));
  });
}

export default fetchSongs;