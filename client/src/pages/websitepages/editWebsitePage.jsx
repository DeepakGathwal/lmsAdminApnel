import React, { useRef,useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import grapesjs from 'grapesjs';
import { editWebSitePage, deleteWebSitePage,allWebSitePage } from '../../Components/CommonUrl/apis';
import GrapesJSExample from '../../Components/grapseJs/GrapeJsEditor';


function EditWebsitePage() {
    const {id} = useParams()
  
    const navigate = useNavigate()
    const editorRef = useRef(null);
    const allData = async () => {
       
        const {data} = await allWebSitePage("/website", 0, 0, id)
        
        setField(...data)
      }


    const [field, setField] = useState({
     name : "", nav_link : "",  page_html : "", page_css : "", backgroundimage : "",image : "", explore : false
    })

    const handelChange = (e) => {
        const { name, value, type, checked } = e.target;
        setField(prevField => ({
            ...prevField,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    useEffect(() => {
        allData()
    },[id])
  
    const editTutorial = async (e) => {
        if (editorRef.current) {
            const editor = grapesjs.editors.find((editor) => editor.getContainer() === editorRef.current);
      const htmlData = editor.getHtml();
      const cssContent = editor.getCss();
        
        e.preventDefault()
        // name, nav_link, html, css, color, background_color, fontsize, fontwight, fontfamily
          
        const done = await editWebSitePage('/website', id, field,htmlData, cssContent)
        if(done.success == true) {
            setField("")
            navigate('/website')
     
        }
        alert(done.message)
      }else return
      
    }
   
    return ( 
        <div className='containers'>
        <div className="page">
        <h3 className='heading mb-4'>Tutorial Add</h3>
                <form action="POST" onSubmit={editTutorial}>
                    <div className="form-group">
                        <label for="coursename">Page Name</label>
                        <input type="text" name="name" id="" className='form-control' value={field.name} onChange={handelChange} required />

                    </div>
                    <div className="form-group">
                        <label for="coursename">Page Link</label>
                        <input type="text" name="nav_link" id="" className='form-control' value={field.nav_link} onChange={handelChange} required />

                    </div>
                    <div className="form-group">
                        <label for="coursename">Show on Header
                  
                        <input type="checkbox" name="explore" value={field.explore} checked={field.explore} onChange={handelChange} />
                        </label>

                    </div>
                    <div className="form-group">
                        <label htmlFor=""> Page
                          <GrapesJSExample editorRef= {editorRef} page_html = {field.page_html} page_css = {field.page_css}/>
                        </label>
                    </div>
                    <input type="submit" value="Submit" className='btn-create' />
                </form>
       </div>
       </div>
       )
}




export default EditWebsitePage
