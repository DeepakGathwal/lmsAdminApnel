import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';
import { MdDelete, MdEditSquare} from "react-icons/md";

import { addVideos, allCourseChapter, allVideos, deleteVideos, editVideos } from '../../Components/CommonUrl/apis'
import Header from '../../Components/pageComponents/header';
import Pagination from '../../Components/pageComponents/pagination';

const ETopics = () => {
  const [selected, setSelected] = useState([]);
  const [show, setShow] = useState(false);
  const [defaultcourceList, setdefaultCource] = useState();
  const [state, setState] = useState([]);
  const [chapter, setChapter] = useState();
  const [currentPage, setcurrentPage] = useState(1);
  const [query, setQuery] = useState("");
   const [posts, setPosts] = useState({
    id: "",topic: "", videoLink: "", timing : ""
  });

  const location = useLocation();
  const path = location.pathname;

  let optionArray = [];


  const chaptersList = async () => {
    const { data } = await allCourseChapter("/e-courseChapter", 'All');
    if (data) {
      await data.map((el) => {
        optionArray.push({ label: el.chapter, value: el.id });
      });
      return setChapter(optionArray);
    }
  };

 

  // Function to confirm delete of video
  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you Sure want to delete");
    if (value) {
      const deleteMember = await deleteVideos(path, id);
      if (deleteMember.success == true) {
        alert(deleteMember.message);
        allData();
      } else alert(deleteMember.message);
    } else return false;
  };

  // Function to download brochure
 

 

  const handleClose = () => {
    setShow(false);
    setPosts("");
    setdefaultCource([]);
    setSelected([]);

  

  };

  const allData = async (limit) => {
    const givenLimit = limit == 0 ? state && state.data && parseInt(state.limit) : limit;
    const data = await allVideos(path, givenLimit, currentPage);
    chaptersList();
    return data && setState(data);
  };

  const handelChange = (e) => {
    setPosts({ ...posts, [e.target.name]: e.target.value })
  }
  /** edit and craete company  */
  const handelCreateAndUpdate = async (e) => {
    e.preventDefault()
    if (selected.length == 0  && !defaultcourceList) return alert("Chapers Must be slected")
      
      let data ;
    if (posts.id > 0) {
  
      const editcourcesid = selected && await selected.map((el) => el.label)
      const removeSameData = [...new Set(editcourcesid)]
      data = await editVideos(path, posts, removeSameData)
    }else {
     const chapterid = await selected.map((el) => el.value)
   data = await addVideos(path, posts, chapterid)

 }
 if (data.success == true) {
      allData()
      setShow(false);
      setPosts("")
      setSelected([])
      return data && alert(data.message)
    }else    return data && alert(data.message)
  }
  useEffect(() => {
    allData()
  }, [currentPage])

  let defaultCorces = [];

  const handleEdit = async (el) => {
    if (el) {
      if (el.chapter) {
        const data = await el.chapter.split(",")
        for (let index = 0; index < data.length; index++) {
          defaultCorces.push({ label: data[index], value: data[index] });
        }
        setdefaultCource(defaultCorces);
        setPosts(el);
        setShow(true);
      }
    } else return alert("Module Not Selected");
  };

  return (
    <div className="containers">
      <div className="page">
        <h3 className='heading mb-4'>Videos And Resources</h3>
        <Header setShow={setShow} allData={allData} state={state} setQuery={setQuery} />
        <div className='middlebody m-3'>
          <div className="tableFixHead">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Chapters</th>
                  <th>Topic</th>
                  <th>Video Link</th>
                  <th>Timing</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.data ? state.data.filter((obj) => {
                  if (query == "")
                    return obj;
                  else if (
                   
                    obj.topic.toLowerCase().includes(query.toLowerCase()) ||
                    obj.chapter.toLowerCase().includes(query.toLowerCase())
                  )
                    return obj;
                }).map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                 
                    <td>{el.chapter ??= "--"}</td>
                    <td>{el.topic}</td>
                    <td>
                      {/* Clickable element to open video modal */}
                    
                        {el.videoLink}
                     
                    </td>
                    <td>{el.timing}</td>
                 
                    
                    <td style={{ cursor: "pointer" }}>
                      <MdEditSquare onClick={(e) => handleEdit(el)} />
                      / <MdDelete onClick={(e) => ConfirmBox(el.id)} />
                    </td>
                  </tr>
                )) : <h1>No Data</h1>}
              </tbody>
            </table>
          </div>
        </div>

        <Pagination setcurrentPage={setcurrentPage} currentPage={currentPage} state={state} />

        {/* Bootstrap Modal for adding/editing videos */}
        <Modal show={show} onHide={() => handleClose(setShow, setPosts)}>
          <Modal.Header closeButton>
            <Modal.Title>Videos And Resources</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="batchesform fw-semibold">
              <form action="" method="post" onSubmit={handelCreateAndUpdate}>
                <div className="form-group">
                  <label htmlFor="" className='text-dark mt-2 fw-semibold'>Video Topic</label>
                  <input type="text" value={posts.topic} name="topic" className="form-control" id="" onChange={handelChange} />
                </div>
               
                <div className="form-group">
                  <label htmlFor="" className='text-dark mt-2 fw-semibold'>Video Timing</label>
                  <input type="text" value={posts.timing} className="form-control" name="timing" id="" onChange={handelChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="" className='text-dark mt-2 fw-semibold'>Chapter</label>
                  {chapter && <Select
                    isMulti
                    name="colors"
                    defaultValue={defaultcourceList}
                    options={chapter}
                    onChange={setSelected}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />}
                </div>

                <div className="form-group">
                  <label htmlFor="" className='text-dark mt-2 fw-semibold'>Video</label>
                  <input type="link" className="form-control" name="videoLink" id="" value={posts.videoLink}  onChange={handelChange}/>
                </div>
                <input type="submit" className="form-control" value="Save Button" />
              </form>

            </div>

          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default ETopics;
