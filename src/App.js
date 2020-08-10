import React, { useRef, useState} from 'react';
import './App.css';
import ResultList from "./results/Results";

function App(props) {
  const [currentPage , setCurrentPage] = useState(1);
  const [lastPage,setLastPage] = useState(1);
  const [loader,setLoader] = useState(false);
  const [query,setQuery] = useState('');
  const [data,setData] = useState([]);
  const inputRef = useRef(null);


  function handleForm(e) {
    e.preventDefault();
    let query  = inputRef.current.value;
    setQuery(query);
    setLoader(true);
    setCurrentPage(1);
    setLastPage(1);
    if(query) {
      fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&limit=16&page=1`)
          .then(res => {
            return res.json();
          })
          .then(res => {
            setLoader(false);
            if (res['last_page']) {
              setLastPage(res['last_page']);
              setData(res['results']);
            }
          });
    }else{
      setLoader(false)
    }
  }

  function handleLoadMore(e) {
    let page = currentPage + 1;
    fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&limit=16&page=${page}`)
        .then(res=>res.json())
        .then(res=>{
          if (res['last_page']) {
            setLastPage(res['last_page']);
            setData(data=>[...data,...res['results']] );
            setCurrentPage(page)
          }
        })
  }
  return (
    <div className="App">
    <form className='search-form' onSubmit={handleForm}>
      <div className='form-fields'>
        <input ref= {inputRef} type='text' placeholder='Search here ....'/>
        <button>Go</button>
      </div>
      <div className={'request_details'}>
        Requesting : <span>
        {loader ? 'loading.....'
            :
            query ? `https://api.jikan.moe/v3/search/anime?q=${inputRef.current.value}&limit=16&page=1`
                :
                'no query'
        }</span>
      </div>
    </form>

     <ResultList data={data} currentPage={currentPage} lastPage={lastPage} handleLoadMore={handleLoadMore}/>
    </div>
  );
}

export default App;
