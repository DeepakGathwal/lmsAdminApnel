import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import UploadImageComponent from '../../Components/pageComponents/uploadImage';
import ModalBody from 'react-bootstrap/esm/ModalBody';
import { allTutorialType, editTutorialCource, singleTutorialCource } from '../../Components/CommonUrl/apis';

function CoursesEdit({ editshow, setEditShow, path, allData, editId ,requiredDimensions}) {
    const [selected, setSelected] = useState(null);

    const [category, setCategory] = useState([])
    const [defaultcourceList, setdefaultCource] = useState(null)

    const [filed, setField] = useState({
        name: "", category: "", meta_tags: "", meta_keywords: "", meta_description: "", icon : ""
    })
    const [icon, setIcon] = useState([])
   
    const handelSumbit = async (e) => {
        e.preventDefault()
        if (!selected && !defaultcourceList) return alert("Cource seletion Nedded")
        const editcourcesid = selected && await selected.map((el) => el.label)
        const removeSameData = [...new Set(editcourcesid)]
        const formData = new FormData()
        formData.append("name", filed.name)
        formData.append("category", removeSameData)

        formData.append("meta_tags", filed.meta_tags)
        formData.append("meta_keywords", filed.meta_keywords)
        formData.append("meta_description", filed.meta_description)
        formData.append("icon", icon[0])
        const data = await editTutorialCource(path, formData, editId)
        if (data.success == true) {
            allData()
            setEditShow(!editshow)
            return alert(data.message)
        } else {
            return alert(data.message)
        }
    }

    const handelChange = (e) => {
        setField({ ...filed, [e.target.name]: e.target.value })
    }

    const handleClose = () => {
        editId = 0;
        setField('')
        setEditShow(!editshow)
    }

    let optionArray = []
    const allCategory = async () => {
        const { data } = await allTutorialType("/atutorial_types");
        if (data) {
            data.map((el) => {
                optionArray.push({ label: el.category, value: el.id })
            })
            setCategory(optionArray)
        } else return alert('You Do not have Permission')
    }

    let defaultCorces = []

    const singleData = async () => {
        const { data } = await singleTutorialCource(path, editId)
        if (data) {

            const response = await data[0].category.split(",")
             for (let index = 0; index < response.length; index++) {
                defaultCorces.push({ label: response[index], value: response[index] })

            }
            await setdefaultCource(defaultCorces)
            setField(...data)

            allCategory()
        } else {
            setEditShow(!editshow)
        }
    }

    useEffect(() => {
        singleData()
    }, [editId])

    return (
        <>

            <Modal show={editshow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Courses</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <div className="coursesForm">
                        <form action="POST" onSubmit={handelSumbit}>
                            <div className="form-group">
                                <label htmlFor="courseName">Course Name</label>
                                <input type="text" name="name" id="" className="form-control" value={filed.name} onChange={handelChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="CourseCategory">Course Topic</label>
                                {defaultcourceList && <Select
                                    isMulti
                                    name="colors"
                                    defaultValue={defaultcourceList}
                                    options={category}
                                    onChange={setSelected}
                                    className="basic-multi-select"
                                    classNamePrefix="select"

                                />}
                            </div>
                            <div className="form-group">
                                <label htmlFor="courseicon" name="icon">Upload Icon
                                <UploadImageComponent image={icon} setImage={setIcon}  existsImage={filed.icon} requiredDimensions={{ width: 70, height: 70 }}/>
                                <span className='text-danger'>*please upload icons with <strong> width: 70 and height: 70 </strong></span> 
                                </label>
                            </div>
                           
                            <div className="form-group">
                                <label for="exampleFormControlTextarea1" name="meta_tags">Meta Title</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="meta_tags" value={filed.meta_tags} onChange={handelChange} />
                            </div>
                            <div className="form-group">
                                <label for="exampleFormControlTextarea1" name="metakeyword" >Meta Keyword</label>
                                <textarea className="form-control" name="meta_keywords" id="exampleFormControlTextarea1" value={filed.meta_keywords} onChange={handelChange} rows="3" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1" name="meta_description">Meta Description</label>
                                <textarea name="meta_description" id="exampleFormControlTextarea1" className="form-control" value={filed.meta_description} onChange={handelChange} rows="3" /></div>
                            <button type="submit" className="btn btn-primary mt-3">Submit</button>
                        </form>
                    </div>

                </ModalBody>


            </Modal>
        </>
    )
}

export default CoursesEdit
