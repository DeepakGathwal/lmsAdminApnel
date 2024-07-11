import React, { useRef, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import grapesjs from 'grapesjs';
import { allBlogCategory, createBlog } from '../../Components/CommonUrl/apis';
import UploadImageComponent from '../../Components/pageComponents/uploadImage';
import GrapesJSExample from '../../Components/grapseJs/GrapeJsEditor';

const AddBlog = ({ show, setShow, path, allData }) => {
  const editorRef = useRef(null);
  const [allCategory, setCategory] = useState([])
  const [image, setImage] = useState([])
  const [banner, setbanner] = useState([])
  const [field, setField] = useState({
    name: "", heading: "", category: "", video_link: "", meta_tags: "", meta_keywords: "", meta_description: "", meta_title: ""
  })

  // close add model 
  const handleClose = () => {
    setShow(false)
  return  setField("")
  };

  // create a new Blog
  const addData = async (e) => {
    e.preventDefault()
    if (!field.category) return alert('Category Seletion Nedded')
      const editor = grapesjs.editors.find((editor) => editor.getContainer() === editorRef.current);
      const htmlData = editor.getHtml();
      const cssContent = editor.getCss();

      const forData = new FormData()
      // name, heading, video_link, meta_tags, meta_keywords, meta_description, meta_title,category, blog
      forData.append('name', field.name)
      forData.append('heading', field.heading)
      forData.append('video_link', field.video_link)
      forData.append('meta_tags', field.meta_tags)
      forData.append('meta_keywords', field.meta_keywords)
      forData.append('meta_description', field.meta_description)
      forData.append('meta_title', field.meta_title)
      forData.append('category', field.category)
      forData.append('blog_html', htmlData)
      forData.append('blog_css', cssContent)
      forData.append('image', image[0])
      forData.append('banner', banner[0])
      const data = await createBlog(path, forData)
      if (data.success == true) {
        allData()
        handleClose()
        alert(data.message)
      } else {
        alert(data.message)
      }
  }

// handel inputs
  const handelChange = (e) => {
    setField({ ...field, [e.target.name]: e.target.value })
  }

// list of catgories
  const category = async () => {
    const { data } = await allBlogCategory('/blog_category', 'All')
    setCategory(data)
  }
  useEffect(() => {
    category()
  }, [])

  return (
    <Modal show={show} dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className='text-center'>Add Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form className='batchesform' action="POST" onSubmit={addData}>
            <div className="form-group">
              <label htmlFor="name"> Name</label>
              <input type="text" name="name" id="" className='form-control' onChange={handelChange} required />

            </div>
            <div className="form-group">
              <label htmlFor="heading"> Heading
                <input type="text" name="heading" id="" className='form-control' onChange={handelChange} required />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="file">Choose Icon
                <UploadImageComponent image={image} setImage={setImage} requiredDimensions={{ width: 1500, height: 500 }} />
                <span className='text-danger'>*please upload icons with <strong>width: 1500 and height: 500</strong><br />*size will be less than <strong>1mb</strong></span>
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="banner">Upload Banner
                <UploadImageComponent image={banner} setImage={setbanner} requiredDimensions={{ width: 1500 , height: 200 }} />
                <span className='text-danger'>*please upload icons with <strong>width: 1920 and height: 263</strong><br />*size will be less than <strong>1mb</strong></span>
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="category mb-2"> Category
                <select name="category" id="" className='form-control' onChange={handelChange} required>
                  <option selected disabled>Select Category</option>
                  {allCategory && allCategory.map((el) => (
                    <option value={el.id}>{el.name}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="blog"> Blog Content
                <GrapesJSExample editorRef={editorRef} page_html={''} page_css={''} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="videoLink">Video Link
                <input type="url" name="video_link" id="" className='form-control' onChange={handelChange} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="meta_title">
                Meta Title
                <textarea type="text" name="meta_title" id="" className='form-control' onChange={handelChange} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="meta_title">
                Meta Keywords
                <textarea type="text" name="meta_keywords" id="" className='form-control' onChange={handelChange} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="meta_title">
                Meta description
                <textarea type="text" name="meta_description" id="" className='form-control' onChange={handelChange} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="meta_tags">
                Meta Tags  <textarea type="text" name="meta_tags" id="" className='form-control' onChange={handelChange} />
              </label>
            </div>
            <input type="submit" value="Save Blog" className=' btn btn-primary btn-create' />
          </form>
        </div>
      </Modal.Body>
    </Modal>

  )
}

export default AddBlog
