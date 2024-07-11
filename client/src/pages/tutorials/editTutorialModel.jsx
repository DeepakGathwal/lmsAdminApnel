import React, { useRef,useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import grapesjs from 'grapesjs';
import { editTutorial, allTutorialCourceForSearch,  allTutorialCategory, getSingleTutorial } from '../../Components/CommonUrl/apis';
import GrapesJSExample from '../../Components/grapseJs/GrapeJsEditor';

function EditTutorial() {
    const navigate = useNavigate()
    const {id} = useParams()
    const editorRef = useRef(null);
    const [allcources, setAllCources] = useState([])
    const [courcesCategory, setCourcesCategory] = useState([])
  

    const [field, setField] = useState({
        cources : "",  category : "", meta_title: "", meta_description: "", meta_keywords: "", meta_tags: "", heading: "", tutorial_html : "", tutorial_css : ""
    })

    const getTutorial = async() => {
        const {data} = await getSingleTutorial("/tutorials", id)
   
        if(data){
            setField(...data)
          return  allCourcesList()
        }

    }

    const handelChange = (e) => {
        setField({ ...field, [e.target.name]: e.target.value })
    }

    const allCourcesList = async () => {
        const { data } = await allTutorialCourceForSearch('/btutorialCource', 'All')
        if(data)
        setAllCources(data)
    

    }

    const courceCategory = async (couceCate) => {
        const { data } = await allTutorialCategory('/ctutorial_chapter', couceCate)
       
        if(data){
        field.cources = couceCate;
        setCourcesCategory(data)
       } else {
            const value = window.confirm("Selected Cource Do not carrie any Category. You Can not continue without created any category");
       if (value) {
   
      return  navigate('/ctutorial_chapter')
   
       }else return 
   }
    }

  

    useEffect(() => {
       getTutorial()
    }, [id])

  

    const tutorialedit = async (e) => {
        if (editorRef.current) {
            const editor = grapesjs.editors.find((editor) => editor.getContainer() === editorRef.current);
            const htmlData = editor.getHtml();
            const cssContent = editor.getCss();
        e.preventDefault()
        if(!field.cources) return alert("Cource Selection Needed")
        if(!field.category) return alert("Cource Category Selection Needed")
        const done = await editTutorial('/tutorials', id,htmlData, cssContent,field)
        if(done.success == true) {
            setField("")
            alert(done.message)
          return  navigate('/tutorials')
        }else   
        return alert(done.message)
      }
    }

    return (
      
        <div className='containers'>
        <div className="page">
        <h3 className='heading mb-4'>Tutorial Add</h3>
                <form action="POST" onSubmit={tutorialedit}>
                    <div className="form-group">
                        <label for="coursename">Course Name</label>
                        <select className="form-control" name='cources'  id="courcename" onChange={(e) => courceCategory(e.target.value)} required>
                            <option selected>{field.cources}</option>
                            {allcources && allcources.map((el) => (
                                <option value={el.name}>{el.name}</option>
                            ))}
                        </select>

                    </div>
                    {courcesCategory && courcesCategory.length > 0 && <div className="form-group">
                        <label for="coursecategory">Course Topic</label>
                        <select className="form-control" id="courcecategory" name='category'  onChange={handelChange} required>
                            <option selected >{field.category}</option>
                            {courcesCategory && courcesCategory.map((el) => (
                                <option value={el.category_name}>{el.category_name}</option>
                            ))}
                        </select>
                    </div>
                    }
                   
                  
                    <div className="form-group">
                        <label htmlFor="heading">Heading</label>
                        <input type="text" name="heading" id="" value={field.heading} className='form-control' onChange={handelChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor=""> Tutorial
                          <GrapesJSExample editorRef= {editorRef}  page_html = {field.tutorial_html} page_css = {field.tutorial_css}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Meta Tag</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" name='meta_tags' value={field.meta_tags} rows="3" onChange={handelChange} required />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Meta Title</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" name='meta_title' value={field.meta_title} rows="3" onChange={handelChange} required />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Meta Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" name='meta_description' value={field.meta_description} onChange={handelChange} rows="3" required />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Meta Keyword</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" name='meta_keywords' value={field.meta_keywords} rows="3" onChange={handelChange} required />
                    </div>
                    <input type="submit" value="Submit" className='btn-create' />
                </form>
       </div>
       </div>
       )
}

export default EditTutorial
