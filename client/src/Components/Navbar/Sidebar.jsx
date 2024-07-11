import { useState, useEffect } from "react";
import "./Sidebar.scss"
import SidebarMenu from "./SidebarMenu";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineAlignRight } from "react-icons/ai";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { FiEdit, FiLock, FiRefreshCcw, FiSettings, FiUser } from "react-icons/fi";
import { BsEnvelope, BsBell, BsFillPersonFill } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineSearch } from "react-icons/ai";
import { getProfileData, getUerModules, logoutApi, pendingNotifications, readNotifications } from "../CommonUrl/apis";
import io from 'socket.io-client';

const SideBar = () => {
  const navigate = useNavigate();
  const socket = io.connect('http://localhost:8000/');
  const [admin, setAdmin] = useState([]);
  const [routers, setRouters] = useState([]);
  const [length, setLength] = useState(0);
  const [data, setData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const userData = async () => {
    const value = await getProfileData();
    if (value.success === true) {
      setAdmin(value.data);
      const { data } = await getUerModules();
      if (data) {
        setRouters(data);
      } else {
        window.localStorage.clear();
        navigate("/login");
      }
    } else {
      window.localStorage.clear();
      navigate("/login");
    }
  };

  useEffect(() => {
    const handleGetMessage = async (val) => {
      const { data } = await pendingNotifications("/");
      if (data) {
        setLength(data[0].total);
        setData((prevData) => [...prevData, val]);
      }
    };

    socket.on('getMessage', handleGetMessage);
    return () => {
      socket.off('getMessage', handleGetMessage);
    };
  }, [socket]);

  const localStorageItem = window.localStorage.getItem("success");

  useEffect(() => {
    if (localStorageItem) {
      userData();
    } else {
      navigate('/login');
      logoutApi();
    }
  }, []);

  const navPersonalItem = [
    {
      navGridItemIcon: <FiRefreshCcw />,
      navGridItemtitle: "Activity",
      color: 'green',
      path: '/profile'
    },
    {
      navGridItemIcon: <BsEnvelope />,
      navGridItemtitle: "Message",
      color: 'green',
      path: '/profile'
    },
    {
      navGridItemIcon: <FiUser />,
      navGridItemtitle: "Profile",
      color: 'green',
      path: '/profile'
    },
    {
      navGridItemIcon: <RiCheckboxMultipleBlankLine />,
      navGridItemtitle: "Project",
      color: 'green',
      path: '/profile'
    },
    {
      navGridItemIcon: <FiSettings />,
      navGridItemtitle: "Settings",
      color: 'green',
      path: '/profile'
    },
  ];

  const navi = (path) => {
    navigate(path);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const userActionFunctions = async () => {
    const data = await logoutApi();
    if (data.success === true) {
      window.localStorage.clear();
      navigate('/login');
    } else {
      alert("Something Went Wrong");
    }
  };

  const toggleActive = () => {
    const mtoggle = document.getElementById('root');
    if (mtoggle) {
      mtoggle.classList.toggle('full-width');
      setIsActive(!isActive);
    }
  };

  const removeNotification = async () => {
    const data = await readNotifications("/");
    if (data.success === true) {
      setLength(0);
      setData([]);
    }
  };

  const sidebarWidth = windowWidth <= 768 ? (isOpen ? '220px' : '0px') : (isOpen ? '220px' : '60px');

  return (
    <>
      <div className="nav-container">
        <nav className='admin-header'>
          <div className="nav-logo">
            <img src="/assests/logo.jpg" alt="logo" />
          </div>
          <div className="nav-items">
            <ul>
              <li className='nav-item'><AiOutlineAlignRight onClick={() => { toggle(); toggleActive(); }} /></li>
            </ul>
            <ul>
              <li className='nav-item' onClick={removeNotification}><BsBell />
                <sup>{length}</sup>
                <div className="dropdown-container">
                  <div className="dropdown-header">
                    <strong>Notification</strong>
                  </div>
                  <div className="dropdownItem">
                    <ul>
                      {data && data.map((el, i) => (
                        <li key={i}>
                          <a href="/form_enquiry">
                            <div className="m-5 p-5" dangerouslySetInnerHTML={{ __html: el }} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
              <li className='nav-item'>
                <BsFillPersonFill />
                <div className="dropdown-container personal-view">
                  <div className="dropdown-header">
                    <NavLink to={'/dashboard/user'}>
                      <span>{admin.length === 1 && admin[0].role}</span>
                    </NavLink>
                    <strong onClick={userActionFunctions}>log out</strong>
                  </div>
                  <div className="dropdownItem">
                    <ul>
                      {navPersonalItem.map((list, index) => (
                        <li key={index}>
                          <span style={{ color: list.color }}>{list.navGridItemIcon}</span>
                          <span onClick={() => navi(list.path)}>{list.navGridItemtitle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <aside className="main-container">
        <motion.div
          animate={{
            width: sidebarWidth,
            transition: {
              duration: 1,
              type: "spring",
              damping: 20,
            },
          }}
          className={`sidebar `}
        >
          <div>
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                />
              )}
            </AnimatePresence>
            <div className="bars" />
          </div>
          <section className="routes">
            {routers && routers.map((route, index) => {
              if (route.sub) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    key={index}
                  />
                );
              }
              return (
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={route.modules}
                  key={index}
                  className="link"
                  activeclassname="active"
                >
                  <div className="icon">
                    <img src={route.icon ?? '/assests/logo.jpg'} alt="icon" width={22} height={22} />
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>
      </aside>
    </>
  );
};

export default SideBar;
