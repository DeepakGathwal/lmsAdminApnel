import React, { useRef,useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createWebSitePage } from '../../Components/CommonUrl/apis';
import grapesjs from 'grapesjs';
import GrapesJSExample from '../../Components/grapseJs/GrapeJsEditor';
import UploadImageComponent from '../../Components/pageComponents/uploadImage';


function CreatePage() {
    const navigate = useNavigate()
    const editorRef = useRef(null);
    const [check,setCheck] = useState(false)
    const [icon,setIcon] = useState([])
    const [banner,setBanner] = useState([])
  

    const [field, setField] = useState({
     name : "", link : "", colour : "",  bac : "",fontSize : "", fontWeight : "", fontFamily : ""
    })

    const handelChange = (e) => {
        setField({ ...field, [e.target.name]: e.target.value })
    }

    
    const addTutorial = async (e) => {
        if (editorRef.current) {
            const editor = grapesjs.editors.find((editor) => editor.getContainer() === editorRef.current);
      const htmlData = editor.getHtml();
      const cssContent = editor.getCss();
        
        e.preventDefault()
            const formDate = new FormData()
            formDate.append("name", field.name)
            
            formDate.append("nav_link", field.link)
            formDate.append("html", htmlData)
            formDate.append("css", cssContent)
            formDate.append("color", field.colour)

        const done = await createWebSitePage('/website', formDate,check)
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
        <h3 className='heading mb-4'>Web Page Add</h3>
                <form action="POST" className='m-2' onSubmit={addTutorial}>
                    <div className="form-group">
                        <label for="coursename">Page Name</label>
                        <input type="text" name="name" id="" className='form-control' onChange={handelChange} required />

                    </div>
                    <div className="form-group">
                        <label for="coursename">Page Link</label>
                        <input type="text" name="link" id="" className='form-control' onChange={handelChange} required />

                    </div>
                    <div className="form-group">
                        <label for="coursename">Show on Header</label>
                        <input type="checkbox"  onChange={() => setCheck(!check)} />

                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="">Page
                          <GrapesJSExample editorRef= {editorRef} page_html = {''} page_css = {''}/>
                        </label>
                    </div>
                    <input type="submit" value="Submit" className='btn-create' />
                </form>
       </div>
       </div>
       )
}

export default CreatePage
