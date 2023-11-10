import Photo from "./Photo";

const PhotoGallery = ({photos}) => {
console.log(photos);
  return (
    (<div className="wrapper">
      <div id="myModal" className="modal">
        <img id="modalImage" className="Modal Image"></img>
      </div>
      <div className="grid grid-three-column">
      {photos.map(photo=><Photo photo={photo}/>)}
      </div>
    </div>)
  );
}

export default PhotoGallery;
