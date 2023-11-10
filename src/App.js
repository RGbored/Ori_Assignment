import { useEffect, useState } from 'react';
import './App.css';
import { createFlickr} from 'flickr-sdk';
import PhotoGallery from './PhotoGallery';
import Search from './Search';
import Loading from './Loading';

const {flickr} = new createFlickr(process.env.REACT_APP_API_KEY);


function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchRestriction, setSearchRestriction] = useState(0);

  async function getData(){
    const res = await flickr("flickr.photos.getRecent", {
      page: page, 
      safe_search: 1, 
    });
    setPhotos((prev)=>[...prev, ...res.photos.photo]);
    setLoading(false);
  }

  useEffect(()=>{
    search();
  }, [searchText]);

  async function search(text){

    if(!searchText)
    {
      getData();
      return;
    }
    console.log(searchText);
    // if(text) {
    //   setSearchText(text);
    // }
    let prevSearches = [];
    if(localStorage.prevSearches) prevSearches = JSON.parse(localStorage.prevSearches);
    prevSearches = [searchText, ...prevSearches.slice(0, Math.min(5, prevSearches.length))];
    prevSearches = prevSearches.filter((value, index, array)=>{return array.indexOf(value)===index})
    localStorage.prevSearches = JSON.stringify(prevSearches);
    const options = {
      text: searchText
      // text: text
    };
    if(searchRestriction!==0) options.safe_search = searchRestriction;
    const res = await flickr("flickr.photos.search", options);
    console.log(res);
    setPhotos(res.photos.photo);

  }

  useEffect( ()=>{
     getData();
  }, [page]);

  const handleInfiniteScroll = async () => {
    try {
      if(window.innerHeight + document.documentElement.scrollTop +1 >= 
        document.documentElement.scrollHeight)
      {
        setLoading(true);
        setPage((prev)=>prev+1);
      }
    }
      catch(err){
        console.log(err);
      }
    };

  useEffect(()=> {
    window.addEventListener("scroll", handleInfiniteScroll);
    return ()=> window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);


  return (
    <div>
      <Search searchText={searchText}  setSearchText = {setSearchText} search = {search} setSearchRestriction = {setSearchRestriction}/>
      <div className='body'>
      <PhotoGallery photos={photos}/>
      {loading && <Loading/>}
      </div>
    </div>
  );
}

export default App;
