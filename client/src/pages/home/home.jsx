import React, { useState, useEffect } from "react";
import './home.css'
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts'
import { GoDotFill  } from "react-icons/go";
import { MdArrowUpward } from "react-icons/md";
import { FaYoutube, FaFacebook, FaInstagramSquare, FaTelegram, FaTwitterSquare, FaLinkedin, FaEllipsisH } from "react-icons/fa";
import { allBlogNames ,getHeadingsOfTutorial, listOfBatches, chartData, allTestamonials, permissions, allModules, teamMembers, allCompanies} from "../../Components/CommonUrl/apis";


const Home = () => {
    const [student, setStudent] = useState(0)
    const [tuto, setTuto] = useState(0)
    const [bateches, setbateches] = useState(0)
    const [blogs, setblogs] = useState(0)
    const [module, setmodule] = useState(0)
    const [members, setmembers] = useState(0)
    const [allpermissions, setpermissions] = useState(0)
    const [comapnies,setcomapnies] = useState([])
    const [chartdata,setChartData] = useState([])


    const allStudent = async() => {
        const {data} = await allTestamonials('/testimonials')    
       
            allTutorialLength()
       return data && setStudent(data.length)
    }
    const allTutorialLength = async() => {
        const {data} = await getHeadingsOfTutorial('/tutorials')
            allBatchesLength()
        return  data &&  setTuto(data.length);
    }
    const allBatchesLength = async() => {
        const {data} = await listOfBatches('/batches')
    
            allBlogNamesLength()
   return   data &&      setbateches(data.length);
    }
    const allBlogNamesLength = async() => {
        const {data} = await allBlogNames('/blog')
        chartDetails()
    return data && setblogs(data.length);
    }
    const permissionDetails = async() => {
        const {data} = await permissions('/permissions','')
        modulesDetails()
    return data && setpermissions(data.length);
    }
    const modulesDetails = async() => {
        const {data} = await allModules('/modules')
        teamDetails()
    return data && setmodule(data.length);
    }
    const teamDetails = async() => {
        const {data} = await teamMembers('/team')
        companyDetails()
    return data && setmembers(data.length);
    }
    const companyDetails = async() => {
        const {data} = await allCompanies('/companies')
    return data && setcomapnies(data.length);
    }
    const chartDetails = async() => {
        const {data} = await chartData()
        permissionDetails()
    return data && setChartData(data);
    }

  
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
        <div className="card-group dashcards m-3">
                    <div className="card card-one">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    {/* <h2 className="m-b-0"><i className="mdi mdi-briefcase-check text-info"></i></h2> */}
                                    <h6 className="card-subtitle">Total Tutorials</h6></div>
                                    <h3 className="txtpanel">{tuto}</h3>
                                <div className="col-12">
                                    <div className="progress">
                                        <div className="progress-bar bg-info" role="progressbar" style={{width:`${tuto}%`,height:"6px"}}  aria-valuenow='25' aria-valuemin="0" aria-valuemax="100"></div>
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
                                    <h6 className="card-subtitle">Total Testimonials</h6></div>
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
                <div className="col-lg-8 col-xlg-9">
                        <div className="card bot-card m-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="d-flex flex-wrap">
                                            <div>
                                                <h4 className="card-title">Chart</h4>
                                            </div>
                                            <div className="ml-auto">
                                                <ul className="list-inline">
                                                    <li>
                                                        <h6 className="text-react"><GoDotFill />Ecommers-Courses</h6> </li>
                                                    <li>
                                                        <h6 className="text-angular"><GoDotFill />Website-Courses</h6> </li>
                                                    <li>
                                                        <h6 className="text-vue"><GoDotFill />Users</h6> </li>
                                                    <li>
                                                        <h6 className="text-node"><GoDotFill />Videos</h6> </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex flex-wrap">
                                       <LineChart width={900} height={600} data={chartdata}>
                                        <Line type="monotone" dataKey="ecommers_course" stroke="#2196F3" strokeWidth={3} />
                                        <Line type="monotone" dataKey="website_course" stroke="#F44236" strokeWidth={3} />
                                        <Line type="monotone" dataKey="users" stroke="#FFCA29" strokeWidth={3} />
                                        <Line type="monotone" dataKey="videos" stroke="#21f35d" strokeWidth={3} />
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
                    
                    <div className="col-lg-4 col-xlg-3">
                        <div className="card bot-card card-inverse card-info m-3">
                            <div className="card-body align-center">
                                <div className="d-flex">
                                    <div>
                                        <h3 className="card-title text-black">Total Modules</h3> </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 align-self-center">
                                        <h2 className="font-light text-black"><sup><small> <MdArrowUpward /> </small></sup>{module}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card card-inverse card-success m-3">
                            <div className="card-body align-center">
                                <div className="d-flex">
                                    <div>
                                        <h3 className="card-title text-black">Total Team Members</h3> </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 align-self-center">
                                        <h2 className="font-light text-black"><sup><small> <MdArrowUpward /> </small></sup>{members}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card card-inverse card-info m-3">
                            <div className="card-body align-center">
                                <div className="d-flex">
                                    <div className="m-r-20 align-self-center"></div>
                                    <div>
                                        <h3 className="card-title text-black">Total Permissions</h3></div>
                                </div>
                                <div className="row">
                                    <div className="col-6 align-self-center">
                                        <h2 className="font-light text-black"><sup><small><MdArrowUpward /></small></sup>{allpermissions}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card card-inverse card-success m-3">
                            <div className="card-body align-center">
                                <div className="d-flex">
                                    <div className="m-r-20 align-self-center"></div>
                                    <div>
                                        <h3 className="card-title text-black">Total Compaines</h3></div>
                                </div>
                                <div className="row">
                                    <div className="col-6 align-self-center">
                                        <h2 className="font-light text-black"><sup><small><MdArrowUpward /></small></sup>{comapnies}</h2>
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
