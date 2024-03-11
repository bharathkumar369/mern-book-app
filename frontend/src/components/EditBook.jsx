import React,{useState,useEffect} from 'react';
import BackButton from './BackButton';
import Spinner from './Spinner';
import axios from 'axios';
import { useNavigate ,useParams } from 'react-router-dom';


const EditBook = () => {

  const [title,setTitle] = useState("");
  const [author,setAuthor] = useState("");
  const [publishYear,setPublishYear] = useState("");
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(()=>{
    setLoading(false);
    axios.get(`http://localhost:5500/books/${id}`)
      .then((res)=>{
        setAuthor(res.data.author);
        setTitle(res.data.title)
        setPublishYear(res.data.publishYear)
        setLoading(false)
      }).catch((err)=>{
        setLoading(false)
        alert("An error occures happened. Please check console");
        console.log(err)
      })
  })
  const handleEditBook = () => {

    const data = {
      title,author,publishYear
    };
    setLoading(true);
    axios.put(`http://localhost:5500/books/${id}`,data)
      .then(()=>{
        setLoading(false);
        navigate("/")
      })
      .catch((err)=>{
        setLoading(false);
        alert("An error happened. please check console")
        console.log(err)
      })
  }

  return (
    
    <main className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit book</h1>
      {loading ? <Spinner/> : ""}
      <section className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input 
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input 
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publsih Year</label>
          <input 
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>

      </section>
    </main>
  )
}

export default EditBook