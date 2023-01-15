export const VideoCard = (props) => {
  return (
  <div className="video-card" onClick={() => props.changeVideo(props.video.videoId)}>
    <p>{props.video.alias}</p>
    <p>youtube.com/watch?v={props.video.videoId}</p>
    <button onClick={() => props.removeVideo(props.video.listId)}>Remove</button>
  </div>
  );
} 