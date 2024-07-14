import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Home from "./pages/home/home";
import Team from "./pages/team/team";
import Login from "./pages/authorization/login";
import Forgetpassword from "./pages/authorization/forgetpassword";
import Batches from "./pages/batches/batches";
import SideBar from "./Components/Navbar/Sidebar";
import HandelSlideBar from "./pages/authorization/handelSlideBar";
import Module from "./pages/module/module";
import Roles from "./pages/roles/roles";
import Courses from "./pages/courses/courses";
import Categories from "./pages/courses/types";
import Permission from "./pages/permissions/permission";
import Company from "./pages/company/company";
import AboutUs from "./pages/aboutUs/aboutUs";
import Testimonials from "./pages/testimonials/testimonials";
import CourceChapter from "./pages/courses/courceChapter";
import Banners from "./pages/websitepages/websitepags";
import CourceSubCategories from "./pages/courses/chapterTopics";
import Blog from "./pages/blog/blog";
import BlogCategory from "./pages/blog/category";
import UserProfile from "./Components/userProfile/UserProfile";
import Footer from "./pages/footer/footer";
import Tutorials from "./pages/tutorials/tutorials";
import TutorialCategory from "./pages/tutorials/tutorialCategory";
import EditTutorial from "./pages/tutorials/editTutorialModel";
import Tutorialmodal from "./pages/tutorials/tutorialmodal";
import Faqs from "./pages/faqs/faqs";
import TermsConditions from "./pages/termsandconditions/termsAndConditions";
import TutorialCource from "./pages/tutorialCources/tutorialCource";
import CreatePage from "./pages/websitepages/createPage";
import EditWebsitePage from "./pages/websitepages/editWebsitePage";
import ChoosingPoint from "./pages/points/choosingPoint";
import FormStatus from "./pages/form/formStatus";
import Forms from "./pages/form/forms";
import CourceJoinPoint from "./pages/courses/courceJoinPoint";
import CourceCategories from "./pages/courses/courceCategory";
import Brochure from "./pages/brochure/brochure";
import TutorialType from "./pages/tutorials/tutorialType";
import ProjectLanguage from "./pages/projects/projectLanguage";
import ProjectTechnologies from "./pages/projects/projectTechnologies";
import ProjectTopics from "./pages/projects/projectTopics";
import ProjectFiles from "./pages/projects/projectFiles";
import Projects from "./pages/projects/projects";
import ProjectTopicPoint from "./pages/projects/projectTopicPoint";
import TypesOfCourses from "./pages/courses/types";
import Courcelabel from "./pages/Ecommers-courses/label";
import Learn from "./pages/Ecommers-courses/learn";
import Prerequisite from "./pages/Ecommers-courses/prerequisite";
import ECourses from "./pages/Ecommers-courses/courses";
import EChapter from "./pages/Ecommers-courses/chapter";
import ETopics from "./pages/Ecommers-courses/topics";
import Users from "./pages/users/clients";
import Payments from "./pages/users/payments";
import TypesOfECourses from "./pages/Ecommers-courses/types";
import CartItem from "./pages/users/cart";
import Wishlist from "./pages/users/wishlist";
import Review from "./pages/users/review";
import Section from "./pages/E-commers/section";

function App() {
  return (
    <>
    <BrowserRouter>
    <HandelSlideBar>
    <SideBar/>
    </HandelSlideBar>
      <Routes>
       <Route path="/" element={ <Home/>}/>
        <Route path="/aproject-languages"  element={ <ProjectLanguage/>}/>
        <Route path="/bproject-technologies" element={ <ProjectTechnologies/>}/>
        <Route path="/fproject-files" element={ <ProjectFiles/>}/>
        <Route path="/dproject-topics" element={ <ProjectTopics/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/form_enquiry" element={<Forms/>}/>
        <Route path="/form_status" element={<FormStatus/>}/>
        <Route path="/forgetpassword" element={<Forgetpassword/>}/>
        <Route path="/fcoursepoint" element={<CourceJoinPoint/>}/>
        <Route path="/batches" element= {<Batches/>}/>
        <Route path="*" element={<Home/>}/>
        <Route path="/e-courseCategory" element={<TypesOfECourses/>}/>
        <Route path="/e-courseLevel" element={<Courcelabel/>}/>
        <Route path="/e-courseLearn" element={<Learn/>}/>
        <Route path="/e-coursePrerequisite" element={<Prerequisite/>}/>
        <Route path="/e-courses" element={<ECourses/>}/>
        <Route path="/e-courseChapter" element={<EChapter/>}/>
        <Route path="/e-courseTopics" element={<ETopics/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/payments" element={<Payments/>}/>
        <Route path="/team"  element={ <Team/> }/>
        <Route path="/modules" element={<Module/>}/>
        <Route path="/courses_category" element={<CourceCategories/>}/>
        <Route path="/roles" element={<Roles/>}/>
        <Route path="/bcourses" element={<Courses/>}/>
        <Route path="/acourses_type" element={<Categories/>}/>
        <Route path="/permissions" element={<Permission/>}/>
        <Route path="/companies" element={<Company/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/testimonials" element={<Testimonials/>}/>
        <Route path="/dcourses_chapter" element={<CourceChapter/>}/>
        <Route path="/website" element={<Banners/>}/>
        <Route path="/pageAdded" element={<CreatePage/>}/>
        <Route path="/editpage/:id" element={<EditWebsitePage/>}/>
        <Route path="/choosing_point" element={<ChoosingPoint/>}/>
        <Route path="/ecourses_topics" element={<CourceSubCategories/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/blog_category" element={<BlogCategory/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/atutorial_types" element={<TutorialType/>}/>
        <Route path="/footer" element={<Footer/>}/>
        <Route path="/tutorials" element={<Tutorials/>}/>
        <Route path="/tutorialsEdit/:id" element={<EditTutorial/>}/>
        <Route path="/tutorialsAdd" element={<Tutorialmodal/>}/>
        <Route path="/ctutorial_chapter" element={<TutorialCategory/>}/> 
        <Route path="/faq" element={<Faqs/>}/> 
        <Route path="/t_n_c" element={<TermsConditions/>}/> 
        <Route path="/btutorialCource" element={<TutorialCource/>}/> 
        <Route path="/brochure" element={<Brochure/>}/>
        <Route path="/cprojects" element={<Projects/>}/> 
        <Route path="/eproject-topics-point" element={<ProjectTopicPoint/>}/> 
        <Route path="/cart" element={<CartItem/>}/> 
        <Route path="/wishlist" element={<Wishlist/>}/> 
        <Route path="/review" element={<Review/>}/> 
        <Route path="/sections" element={<Section/>}/> 
    </Routes>
  </BrowserRouter>
    </>
  );
}

export default App
