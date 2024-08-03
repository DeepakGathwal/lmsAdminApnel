import React, { useState, useEffect } from "react";
import './home.css'
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts'
import { GoDotFill  } from "react-icons/go";
import { MdArrowUpward } from "react-icons/md";
import { FaYoutube, FaFacebook, FaInstagramSquare, FaTelegram, FaTwitterSquare, FaLinkedin, FaEllipsisH } from "react-icons/fa";
import { allBlogNames, allStudentList ,getHeadingsOfTutorial, listOfBatches} from "../../Components/CommonUrl/apis";


const Home = () => {
    const [student, setStudent] = useState(0)
    const [tuto, setTuto] = useState(0)
    const [bateches, setbateches] = useState(0)
    const [blogs, setblogs] = useState(0)


    const allStudent = async() => {
        const {total} = await allStudentList('/students')
        if(total > 0)
        setStudent(total);
      else  setStudent(0);
        allTutorialLength()
    }
    const allTutorialLength = async() => {
        const {total} = await getHeadingsOfTutorial('/tutorials')
        if(total > 0)
        
        setTuto(total);
      else  setTuto(0);
        allBatchesLength()
    }
    const allBatchesLength = async() => {
        const {total} = await listOfBatches('/batches'  )
        if(total > 0)
        setbateches(total);
    else    setbateches(0);

        allBlogNamesLength()
    }
    const allBlogNamesLength = async() => {
        const {total} = await allBlogNames('/blog')
        if(total > 0)
        setblogs(total);
    else setblogs(0)
    }

    const data = [
        {name : 2017, react : 32, anguler : 37, vue : 78, node : 56},
        {name : 2018, react : 42, anguler : 23, vue : 21, node : 51},
        {name : 2019, react : 51, anguler : 31, vue : 14, node : 54},
        {name : 2020, react : 89, anguler : 87, vue : 56, node : 34},
        {name : 2021, react : 12, anguler : 27, vue : 12, node : 67},
        {name : 2022, react : 34, anguler : 12, vue : 98, node : 12},
    ]
    const social = [
        {icon : <FaLinkedin/>, suscriber :36588, class:"card-linkedin"},
        {icon : <FaTwitterSquare />, suscriber :36588, class:"card-twitter"},
        {icon : <FaFacebook />, suscriber :36588, class:"card-facebook"},
        {icon : <FaInstagramSquare />, suscriber :36588, class:"card-instagram"},
        {icon : <FaTelegram /> , suscriber :36588, class:"card-telegram"},
        {icon : <FaYoutube /> , suscriber :36588, class:"card-youtube"},
    ]
    

    useEffect(() => {
allStudent()
    },[])

    return (
    <>
     <div className="containers">
      <div className="page">
        <h4 className="heading_panel">Welcome To JTC Dashboard  {/*@Username Required*/}</h4> 
        <div class="card-group dashcards m-3">
                    <div class="card card-one">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    {/* <h2 class="m-b-0"><i class="mdi mdi-briefcase-check text-info"></i></h2> */}
                                    <h6 class="card-subtitle">Total Tutorials</h6></div>
                                    <h3 class="txtpanel">{tuto}</h3>
                                <div class="col-12">
                                    <div class="progress">
                                        <div class="progress-bar bg-info" role="progressbar" style={{width:`${tuto}%`,height:"6px"}}  aria-valuenow='25' aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card cardtwo">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    {/* <h2 className="m-b-0"><i className="mdi mdi-alert-circle text-success"></i></h2> */}
                                    <h6 className="card-subtitle">Total Students</h6></div>
                                    <h3 className="txtpanel">{student}</h3>
                                <div className="col-12">
                                    <div className="progress">
                                        <div className="progress-bar bg-success" role="progressbar" style={{width:`${student}%`,height:"6px"}}   aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card cardthree">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    {/* <h2 className="m-b-0"><i className="mdi mdi-wallet text-purple"></i></h2> */}
                                    <h6 className="card-subtitle">Total Batches</h6></div>
                                    <h3 className="txtpanel">{bateches}</h3>
                                <div className="col-12">
                                    <div className="progress">
                                        <div className="progress-bar bg-primary" role="progressbar" style={{width:`${bateches}%`,height:"6px"}}   aria-valuenow='25' aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    



                    <div className="card cardfour">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    {/* <h2 className="m-b-0"><i className="mdi mdi-buffer text-warning"></i></h2> */}
                                    <h6 className="card-subtitle">Total Blogs</h6></div>
                                    <h3 className="txtpanel">{blogs}</h3>
                                <div className="col-12">
                                    <div className="progress">
                                        <div className="progress-bar bg-warning" role="progressbar" style={{width:`${blogs}%`,height:"6px"}}  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-0 m-3 social-row">

                    {social && social.map((el) => (
                    <div className="col-lg-2">
                        <div className="card card-social">
                            <div className="col-12">
                                <div className="d-flex align-items-center">
                                <h3 className={el.class}>
                                   {el.icon}
                                </h3>
                                <h5 className={el.class + '  ml-auto'}>
                                    {el.suscriber}
                                </h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    ))}

                </div>

                <div className="row g-0">
                <div class="col-lg-8 col-xlg-9">
                        <div class="card bot-card m-3">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="d-flex flex-wrap">
                                            <div>
                                                <h4 class="card-title">Total Courses</h4>
                                            </div>
                                            <div class="ml-auto">
                                                <ul class="list-inline">
                                                    <li>
                                                        <h6 class="text-react"><GoDotFill />React</h6> </li>
                                                    <li>
                                                        <h6 class="text-angular"><GoDotFill />Angular</h6> </li>
                                                    <li>
                                                        <h6 class="text-vue"><GoDotFill />Vue</h6> </li>
                                                    <li>
                                                        <h6 class="text-node"><GoDotFill />Node</h6> </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="d-flex flex-wrap">
                                       <LineChart width={900} height={600} data={data}>
                                        <Line type="monotone" dataKey="react" stroke="#2196F3" strokeWidth={3} />
                                        <Line type="monotone" dataKey="anguler" stroke="#F44236" strokeWidth={3} />
                                        <Line type="monotone" dataKey="vue" stroke="#FFCA29" strokeWidth={3} />
                                        <Line type="monotone" dataKey="node" stroke="#21f35d" strokeWidth={3} />
                                        <CartesianGrid stroke="#ccc"/>
                                        <XAxis dataKey='name'/>
                                        <YAxis />
                                        <Tooltip/>
                                       </LineChart>
                                       <Legend/>
                                       
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-4 col-xlg-3">
                        <div class="card bot-card card-inverse card-info m-3">
                            <div class="card-body align-center">
                                <div class="d-flex">
                                    <div>
                                        <h3 class="card-title">Course Type</h3> </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 align-self-center">
                                        <h2 class="font-light text-white"><sup><small> <MdArrowUpward /> </small></sup>35487</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card card-inverse card-success m-3">
                            <div class="card-body align-center">
                                <div class="d-flex">
                                    <div>
                                        <h3 class="card-title">Course Topic</h3> </div>
                                </div>
                                <div class="row">
                                    <div class="col-6 align-self-center">
                                        <h2 class="font-light text-white"><sup><small> <MdArrowUpward /> </small></sup>35487</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card card-inverse card-info m-3">
                            <div class="card-body align-center">
                                <div class="d-flex">
                                    <div class="m-r-20 align-self-center"></div>
                                    <div>
                                        <h3 class="card-title">Course Sub-Category</h3></div>
                                </div>
                                <div class="row">
                                    <div class="col-6 align-self-center">
                                        <h2 class="font-light text-white"><sup><small><MdArrowUpward /></small></sup>35487</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card card-inverse card-success m-3">
                            <div class="card-body align-center">
                                <div class="d-flex">
                                    <div class="m-r-20 align-self-center"></div>
                                    <div>
                                        <h3 class="card-title">Total Banners</h3></div>
                                </div>
                                <div class="row">
                                    <div class="col-6 align-self-center">
                                        <h2 class="font-light text-white"><sup><small><MdArrowUpward /></small></sup>35487</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    
      </div>
     </div>
    </>
  );
};
export default Home;
