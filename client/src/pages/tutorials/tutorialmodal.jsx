import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import grapesjs from 'grapesjs';
import { addTutorialApi, allTutorialCourceForSearch, allTutorialCategory, module } from '../../Components/CommonUrl/apis';
import GrapesJSExample from '../../Components/grapseJs/GrapeJsEditor';

function Tutorialmodal() {
    const navigate = useNavigate()
    const editorRef = useRef(null);
    const [allcources, setAllCources] = useState([])
    const [courcesCategory, setCourcesCategory] = useState([])


    const [field, setField] = useState({
        cource: "", category: "", meta_title: "", meta_description: "", meta_keywords: "", meta_tags: "", heading: ""
    })

    const handelChange = (e) => {
        setField({ ...field, [e.target.name]: e.target.value })
    }


    const allCourcesList = async () => {
        const { data } = await allTutorialCourceForSearch('/btutorialCource', 'All')
        if (data)
            setAllCources(data)
    }

    const courceCategory = async (couceCate) => {
        const { data } = await allTutorialCategory('/ctutorial_chapter', couceCate)
        if (data) {
            field.cource = couceCate;
            setCourcesCategory(data)
        } else {
            const value = window.confirm("Selected Cource Do not carrie any Chapter. You Can not continue without created any chapter");
            if (value) {
                return navigate('/ctutorial_chapter')

            } else return
        }
    }

    useEffect(() => {
        allCourcesList()
    }, [])

    const addTutorial = async (e) => {
        if (!field.cource) return alert(`Cources needed`)
        if (!field.category) return alert(`Category needed`)
        if (editorRef.current) {
            const editor = grapesjs.editors.find((editor) => editor.getContainer() === editorRef.current);
            const htmlData = editor.getHtml();
            const cssContent = editor.getCss();
            e.preventDefault()
            const done = await addTutorialApi('/tutorials', htmlData, cssContent, field)
            if (done.success == true) {
                setField("")
                navigate('/tutorials')
            }
            alert(done.message)
        }
    }

    return (
        <div className='containers'>
            <div className="page">
                <h3 className='heading mb-4'>Tutorial Add</h3>
                <form action="POST" onSubmit={addTutorial}>
                    <div className="form-group">
                        <label for="coursename">Course Name</label>
                        <select className="form-control" name='cource' id="courcename" onChange={(e) => courceCategory(e.target.value)} required>
                            <option selected>Select Course Name</option>
                            {allcources && allcources.map((el) => (
                                <option value={el.id}>{el.name}</option>
                            ))}
                        </select>

                    </div>
                    {courcesCategory && courcesCategory.length > 0 && <div className="form-group">
                        <label for="coursecategory">Course Category</label>
                        <select className="form-control" id="courcecategory" name='category' onChange={handelChange} required>
                            <option selected disabled >Select Category</option>
                            {courcesCategory && courcesCategory.map((el) => (
                                <option value={el.id}>{el.category_name}</option>
                            ))}
                        </select>
                    </div>
                    }
                    <div className="form-group">
                        <label htmlFor="heading">Heading</label>
                        <input type="text" name="heading" id="" className='form-control' onChange={handelChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor=""> Tutorial
                            <GrapesJSExample editorRef={editorRef} page_html={''} page_css={''} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Meta Tag</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" name='meta_tags' rows="3" onChange={handelChange} required />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Meta Title</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" name='meta_title' rows="3" onChange={handelChange} required />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Meta Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" name='meta_description' onChange={handelChange} rows="3" required />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Meta Keyword</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" name='meta_keywords' rows="3" onChange={handelChange} required />
                    </div>
                    <input type="submit" value="Submit" className='btn-create' />
                </form>
            </div>
        </div>
    )
}

export default Tutorialmodal
