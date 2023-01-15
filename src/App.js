import { useEffect, useState } from 'react';
import { VideoCard } from './VideoCard';
import './App.css';
import './width1000.css';

function App() {
  const LOCAL_STORAGE_KEY = "video-list"

  const [currentVideoURL, setCurrentVideoURL] = useState("https://www.youtube.com/embed/DLzxn1SgKds");
  const [videoList, setVideoList] = useState(() => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
  })

  const [alias, setAlias] = useState("");
  const [videoURL, setVideoURL] = useState("");

  const [searchTerm, setSearchTerm] = useState("")
  
  const changeVideo = (videoId) => {
    setCurrentVideoURL(`https://www.youtube.com/embed/${videoId}`);
  }

  const addVideo = (alias, url) => {
    const id = getIDFromURL(url)

    if(!alias || !id) return false;
    const newVid = {
      listId: videoList.length ? videoList[videoList.length - 1].listId + 1 : 1,
      alias,
      videoId: id
    }
    
    setVideoList([...videoList, newVid])
  }

  const getIDFromURL = (url) => {
    const id = url.slice(-11);
    return (/^[A-Za-z0-9]*$/.test(id) && id.length==11 )? id : false;
  }

  const removeVideo = (id) => {
    setVideoList(videoList.filter((video) => video.listId !== id));
  }

  const displayVideos = (list) => {
    return (
      list.map((vid) => {
        return <VideoCard 
          video={vid} 
          changeVideo={changeVideo} 
          removeVideo={removeVideo}/>
      })
    )
  }

  const displayVideosWithSearchTerm = (term) => {
    if(!term) return displayVideos(videoList);
    
    const filteredResults = videoList.filter((video) => {
      return video.alias.toLowerCase().includes(term.toLowerCase());
    })

    return displayVideos(filteredResults);
  }

  const debug = () => {
    let newId = videoList.length ? videoList[videoList.length - 1].listId + 1 : 1
    addVideo(`Jerma${newId}`, "DLzxn1SgKds")
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(videoList));
  }, [videoList])

  return (
    <div className="App">

      <div id='left-col'>

        <div id='add-video'>
          <input size='30'placeholder='Video Alias' onChange={(event) => {
            setAlias(event.target.value);
          }}/>
          <input size='50'placeholder='https://www.youtube.com/watch?v=XXXXXXXXXXX'onChange={(event) => {
            setVideoURL(event.target.value);
          }}/>
          <button onClick={() => {
            addVideo(alias, videoURL)
          }}>Add</button>
          <button onClick={debug}>Jerma</button>
        </div>
        
        <div id='search-bar'>
          <input placeholder='search aliases' onChange={(event) => {
            setSearchTerm(event.target.value);
          }}/>
        </div>
        
        <div id='video-list'>
          {displayVideosWithSearchTerm(searchTerm)}
        </div>

      </div>
    
      
      <div id="right-col">

        <div id='video-area'>
          <iframe 
            placeholder='add a video'
            allowFullScreen="allowfullscreen"
            mozallowfullscreen="mozallowfullscreen" 
            msallowfullscreen="msallowfullscreen" 
            oallowfullscreen="oallowfullscreen" 
            webkitallowfullscreen="webkitallowfullscreen"
            src={currentVideoURL}>
          </iframe>
        </div>

        <div id='help'>
          <b>How to use</b>
          <p>Enter a video title in "alias" and video URL or ID in the "URL" box.
            Then, click "Add" to add it to the list. Click on any video to watch it.
            Click "remove" to remove a video. You can search the videos based on the
            alias (case insensitive). If you click add and nothing happens, make sure:
            1. both fields are filled out 2. you provided a valid url/id 3. your search
            is clear
          </p>
          <b>Why i made this</b>
          <p>I wanted to be able to watch videos without going through youtube.com.
            The official website can be way too distracting, so i use this. For
            maximum effectiveness, make sure youtube.com is blocked using a site 
            blocker. This website will still be able to play videos.
          </p>
        </div>
      </div>

    </div>
  );
}

export default App;
