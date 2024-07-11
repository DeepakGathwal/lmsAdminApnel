import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { MdDelete, MdEditSquare } from "react-icons/md";
import { addProject, allProjects, allProjectLangauage, allProjecttech, projectCategories, projectdelete } from '../../Components/CommonUrl/apis';
import { useLocation } from 'react-router-dom';

const Projects = () => {
  const [editshow, setEditShow] = useState({
    name: "", project_language: "", project_technologie: "", project_module: "", project_description: "", meta_tags: "", meta_description: "", meta_keywords: "", meta_title: "", project_category: ""
  });
  const [selected, setSelected] = useState(null);
  const [state, setState] = useState([]);
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [technology, setTeachnology] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [video, setvideo] = useState([]);
  const location = useLocation();
  const path = location.pathname;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sumbit = async (e) => {
    e.preventDefault();
    if (editshow.project_language === "") return alert("Select a language required");
    if (!selected) return alert("Course technology required");
    if (editshow.project_category === "") return alert("Project Category required");
    const tech = selected && await selected.map((el) => el.value);
    const formValue = new FormData();
    for (const file of image) {
      formValue.append('image', file);
    }
    formValue.append('video', video);
    formValue.append('name', editshow.name);
    formValue.append('project_language', editshow.project_language);
    formValue.append('project_technologie', tech);
    formValue.append('project_module', editshow.project_module);
    formValue.append('project_description', editshow.project_description);
    formValue.append('meta_tags', editshow.meta_tags);
    formValue.append('meta_description', editshow.meta_description);
    formValue.append('meta_keywords', editshow.meta_keywords);
    formValue.append('meta_title', editshow.meta_title);
    formValue.append('project_category', editshow.project_category);
    const handelSumbit = await addProject(path, formValue);
    if (handelSumbit.success === true) {
      setEditShow("");
      setImage([]);
      setvideo([]);
      allData();
      return alert(handelSumbit.message);
    } else return alert(handelSumbit.message);
  };

  const ConfirmBox = async (id) => {
    const value = window.confirm("Are you sure you want to delete?");
    if (value) {
      const deleteMember = await projectdelete(path, id);
      if (deleteMember.success === true) {
        alert(deleteMember.message);
        allData();
      } else alert(deleteMember.message);
    } else return false;
  };

  const langugeList = async () => {
    const { data } = await allProjectLangauage('/aproject-languages', 'All');
    projectTechnology();
    return data ? setLanguages(data) : alert('Permission required to view project languages');
  };

  let optionArray = [];
  const projectTechnology = async () => {
    const { data } = await allProjecttech('/bproject-technologies', 'All');
    if (data) {
      data.map((el) => {
        optionArray.push({ label: el.technology, value: el.id });
      });
      setTeachnology(optionArray);
      allCategories();
    } else return alert('Permission required to view project technologies');
  };

  const allCategories = async () => {
    const { data } = await projectCategories(path);
    return data && setCategory(data);
  };

  const handelChange = (e) => {
    setEditShow({ ...editshow, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    allData();
  }, []);

  const allData = async (limit) => {
    const givenLimit = limit === 0 ? state && state.data && parseInt(state.limit) : limit;
    const data = await allProjects(path, givenLimit, currentPage);
    langugeList();
    return data && setState(data);
  };

  return (
    <div className="containers">
      <div className="page">
        <div className="project-add-section">
          <div className="tab-head">
            <h3 className='page-title'>Add Project</h3>
          </div>
          <div className="col-md-12">
            <form action="row" method="post" onSubmit={sumbit} className='mx-auto'>
              <div className={`form-row ${isMobile ? '' : 'd-flex'} justify-content-between`}>
                <div className="form-group col-md-5 col-lg-5 col-12">
                  <label htmlFor="name">Name
                    <input type="text" className='m-1 form-control' name="name" id="" onChange={handelChange} required />
                  </label>
                </div>
                <div className="form-group col-md-5 col-lg-5 col-12">
                  <label htmlFor="">Language
                    <select name="project_language" id="" onChange={handelChange} className='form-control'>
                      <option value="" disabled selected>Select Language</option>
                      {languages && languages.map((el) => (
                        <option value={el.id}>{el.language}</option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
              <div className={`form-row ${isMobile ? '' : 'd-flex'} justify-content-between`}>
                <div className="form-group col-md-5 col-lg-5 col-12">
                  <label htmlFor="">Technology
                    {technology && <Select
                      isMulti
                      name="tech"
                      options={technology}
                      onChange={setSelected}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />}
                  </label>
                </div>
                <div className="form-group col-md-5 col-lg-5 col-12">
                  <label htmlFor="" className='input_file'>Images
                    <input type="file" multiple className='m-1' name="image" accept='image/*' id="" onChange={(e) => setImage(e.target.files)} required />
                  </label>
                </div>
              </div>
              <div className={`form-row ${isMobile ? '' : 'd-flex'} justify-content-between`}>
                <div className="form-group col-md-5 col-lg-5 col-12">
                  <label htmlFor="">Modules
                    <input type="text" className='m-1 form-control' name="project_module" id="" onChange={handelChange} required />
                  </label>
                </div>
                <div className="form-group col-md-5 col-lg-5 col-12">
                  <label htmlFor="">
                    Category
                    <select name="project_category" id="" onChange={handelChange} className='form-control'>
                      <option value="" selected >Select Category</option>
                      {category && category.map((el) => (
                        <option value={el}>{el}</option>
                      ))}
                      <option value="other">Add New Category</option> {/* Add option for adding new category */}
                    </select>
                    {/* Input field for adding new category */}
                    {editshow.project_category === "other" && (
                      <input
                        type="text"
                        name="new_category"
                        placeholder="Enter New Category"
                        className='form-control'
                        onChange={handelChange}
                      />
                    )}
                  </label>
                </div>
              </div>
              <div className={`form-row ${isMobile ? '' : 'd-flex'} justify-content-between`}>
                <div className="form-group col-md-5 col-lg-5 col-12">
                  <label htmlFor="">Description
                    <input type="text" className='form-control' name="project_description" id="" onChange={handelChange} required />
                  </label>
                </div>
                <div className="form-group col-md-5 col-lg-5 col-12">
                  <label htmlFor="" className='input_file'>Videos
                    <input type="file" name="video" id="" accept='video/*' onChange={(e) => setvideo(e.target.files[0])} required />
                  </label>
                </div>
              </div>
              <div className={`form-row ${isMobile ? '' : 'd-flex'} justify-content-between`}>
                <div className="form-group col-md-5 col-lg-5 col-12">
                  <label htmlFor="">Meta Tags
                    <input type="text" className='m-1 form-control' name="meta_tags" id="" onChange={handelChange} />
                  </label>
                </div>
                <div className="form-group col-md-5 col-lg-5 col-12">
                  <label htmlFor="">Meta Description
                    <input type="text" className='m-1 form-control' name="meta_description" id="" onChange={handelChange} />
                  </label>
                </div>
              </div>
              <div className={`form-row ${isMobile ? '' : 'd-flex'} justify-content-between`}>
                <div className="form-group col-md-5 col-lg-5 col-12">
                  <label htmlFor="">Meta Keywords
                    <input type="text" className='m-1 form-control' name="meta_keywords" id="" onChange={handelChange} />
                  </label>
                </div>
                <div className="form-group col-md-5 col-lg-5 col-12">
                  <label htmlFor="">Meta Title
                    <input type="text" className='m-1 form-control' name="meta_title" id="" onChange={handelChange} />
                  </label>
                </div>
              </div>
              <input type="submit" className='m-1 btn-create' value="Submit" onChange={handelChange} />
            </form>
          </div>
        </div>
        <div className="project-add-section">
          <div className="tab-head">
            <h3 className="page-title">All Projects</h3>
          </div>
          {state.data && state.data.flatMap((el, i) => (
            <div key={i} className='row project-list'>
              <div>
                <div className='del-button' onClick={(e) => ConfirmBox(el.id)} >
                  <label htmlFor="">Delete Project</label>
                  <MdDelete />
                </div>
              </div>
              <div className='col-5 mx-h-25 info'>
                <h4 >Project Name :  <span >{el.name}</span></h4>
              </div>
              <div className='col-5 mx-h-25 info'>
                <h4>Language :  <span >{el.language}</span></h4>
              </div>
              <div className='col-5 tech-points '>
                <h3>Technology :</h3>
                {el.project_technologie && el.project_technologie.map((ab) => (
                  <button className='tech-button'>
                    {ab.technology}
                  </button>
                ))}
              </div>
              <div className='col-5 mx-h-25 info'>
                <h4>Module : <span >{el.project_module}</span></h4>
              </div>
              <div className='col-5 mx-h-25 info'><h4>Category : <span >{el.project_category}</span></h4>
              </div>
              <div className='col-5 mx-h-25 info'><h4>Description : <span >{el.project_description}</span></h4>
              </div>
              <div className='col-5 mx-h-25 info'><h4>Meta Tags : <span >{el.meta_tags}</span></h4>
              </div>
              <div className='col-5 mx-h-25 info'>
                <h4>Meta Keywords : <span >{el.meta_keywords}</span></h4>
              </div>
              <div className='col-5 mx-h-25 info'>
                <h4>Meta Title : <span >{el.meta_title}</span></h4>
              </div>
              <div className='col-5 mx-h-25 info'>
                <h4>Meta Description : <span >{el.meta_description}</span></h4>
              </div>
              <div className="project-thumbs">
                {
                  el.media && el.media.length > 0 ? (
                    el.media.map((ab, index) => {
                      if (ab.endsWith('.jpg') || ab.endsWith('.png') || ab.endsWith('.jpeg') || ab.endsWith('.gif') || ab.endsWith('.svg')) {
                        return (
                          <div className='thumb-inner' key={ab}>
                            <img src={`https://jtcporject.s3.ap-southeast-2.amazonaws.com/${ab}`} width={350} height={250} className="thumb" alt="slideImages" />
                          </div>
                        );
                      } else {
                        return (
                          <div className='thumb-inner' key={ab}>
                            <video loop muted width="320" height="240" controls preload="auto" className="video-thumb">
                              <source src={`https://jtcporject.s3.ap-southeast-2.amazonaws.com/${ab}`} width="auto" height="auto" type="video/mp4" />
                              <track src={`https://jtcporject.s3.ap-southeast-2.amazonaws.com/${ab}`} kind="subtitles" srcLang="en" label="English" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        );
                      }
                    })
                  ) : (
                    <>
                      <div className="slide1 slides active facade"></div>
                      <div className="slide1 slides facade"></div>
                      <div className="slide1 slides facade"></div>
                      <div className="slide1 slides facade"></div>
                    </>
                  )
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
