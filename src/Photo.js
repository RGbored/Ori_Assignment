
const Photo = ({photo}) => {
        const imageSrc = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`;
        const bigImage = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
      return (
        (<div className="Photo">
          <img 
          alt={photo.title} 
          src={imageSrc}
          onClick={()=>{
            const modal = document.getElementById("myModal");
          const modalImage = document.getElementById('modalImage');
    
          console.log(modal);
          modalImage.src = bigImage;
          modal.style.display = 'flex';
      
          // Close the modal when clicking outside the image
          modal.onclick = function() {
            modal.style.display = 'none';
          };
          }}
          ></img>
        </div>)
      );
    }
    
export default Photo;
    