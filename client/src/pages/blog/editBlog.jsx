import React, { useRef, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import grapesjs from 'grapesjs';
import GrapesJSExample from '../../Components/grapseJs/GrapeJsEditor';
import UploadImageComponent from '../../Components/pageComponents/uploadImage';
import { singleBlog, allBlogCategory, editBlog } from '../../Components/CommonUrl/apis';


const EditBlog = ({ editshow, seteditShow, path, editId, allData }) => {

  const editorRef = useRef(null);
  const [allCategory, setCategory] = useState([])
  const [image, setImage] = useState([])

  const [bannerLink, setbanner] = useState([])
  const [field, setField] = useState({
    id: "", icon: "", banner: "", name: "", heading: "", category: "", video_link: "", meta_tags: "", meta_keywords: "", meta_description: "", meta_title: "", blog_html: "", blog_css: ""
  })

  // close banner
  const handleClose = () => {
    seteditShow(false)
  };


  // Edit a already exists blog
  const addData = async (e) => {
    if (!field.category) return alert(`Category needed`)
    e.preventDefault()
    if (editorRef.current) {
      const editor = grapesjs.editors.find((editor) => editor.getContainer() === editorRef.current);
      const htmlData = editor.getHtml();
      const cssContent = editor.getCss();
      const forData = new FormData()
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
      forData.append('banner', bannerLink[0])
      const data = await editBlog(path, field.id, forData)
      if (data.success == true) {
        allData()
        handleClose()
        return alert(data.message)
      } else return alert(data.message)

    }
  }


  // get single blog data by id
  const dataById = async () => {
    const { data } = await singleBlog(path, editId)
    data && setField(...data)
    return category()


  }

  // handel inputs
  const handelChange = (e) => {
    setField({ ...field, [e.target.name]: e.target.value })
  }

  // list of all categories
  const category = async () => {
    const { data } = await allBlogCategory('/blog_category')
    return setCategory(data)
  }

  useEffect(() => {
    dataById()
  }, [editId])

  return (
    <Modal show={editshow} dialogClassName="modal-90w" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form action="POST" onSubmit={addData}>
            <div className="form-group">
              <label htmlFor="name"> Name
                <input type="text" name="name" id="" className='form-control' value={field.name} onChange={handelChange} required />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="heading"> Heading
                <input type="text" name="heading" id="" className='form-control' value={field.heading} onChange={handelChange} required />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="icon"> Icon
                <UploadImageComponent image={image} setImage={setImage} existsImage={field.icon} requiredDimensions={{ width: 1500, height: 500 }} />
                <span>*please upload icons with at least<strong>width: 1500 and height: 500</strong><br />*file size will be less than <strong>1mb</strong></span>
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="banner">Banner
                <UploadImageComponent image={bannerLink} setImage={setbanner} existsImage={field.banner} requiredDimensions={{ width: 1500, height: 200 }} />
                <span>*please upload icons with at least<strong>width: 1500 and height: 200</strong><br />*size will be less than <strong>1mb</strong></span>
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="category"> Category
                <select name="category" id="" className='form-control' onChange={handelChange} value={field.category} required>
                  <option selected disabled>{field.category}</option>
                  {allCategory && allCategory.map((el) => (
                    <option value={el.name}>{el.name}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-group">
              <label htmlFor=""> Blog
                <GrapesJSExample editorRef={editorRef} page_html={field.blog_html} page_css={field.blog_css} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="videoLink">Video Link
                <input type="url" name="video_link" id="" className='form-control' value={field.video_link} onChange={handelChange} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="mete_title">
                Meta Title
                <input type="text" name="meta_title" id="" className='form-control' value={field.meta_title} onChange={handelChange} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="mete_title">
                Meta Keywords
                <textarea type="text" name="meta_keywords" id="" className='form-control' value={field.meta_keywords} onChange={handelChange} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="mete_title">
                Meta description
                <textarea type="text" name="meta_description" id="" className='form-control' value={field.meta_description} onChange={handelChange} />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="mete_tags">Meta Tags
                <textarea type="text" name="meta_tags" id="" className='form-control' value={field.meta_tags} onChange={handelChange} />
              </label>
            </div>
            <input type="submit" value="Edit Blog" className='btn btn-primary btn-create' />
          </form>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default EditBlog
