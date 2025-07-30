import React from "react";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import {v4 as uuid4} from 'uuid';

const Manager = () => {
  const [form, setForm] = useState({ url: "", username: "", password: "" });
  const [passwordArr, setPasswordArr] = useState([]);
  const passwordRef = useRef();

  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
    setPasswordArr(passwords);
  }, []);

  const savePassword = () => {
    if (form.url.length > 3 && form.username.length >= 3 && form.password.length >= 6) {
      setPasswordArr([...passwordArr, {...form, id: uuid4()}]);
      localStorage.setItem("passwords", JSON.stringify([...passwordArr, {...form, id: uuid4()}]));
      setForm({ url: "", username: "", password: "" });
      passwordRef.current.type = "password";
      toast.success("Password saved successfully!");
    }
    else {
      toast.error("Please fill all fields correctly!");
    }
  };

  const copyPassword = (text) => {
    toast.success("Password copied to clipboard!");
    navigator.clipboard.writeText(text);
  };

  const deletePassword = (id) =>{
    let approval = confirm("Are you sure you want to delete this password?");
    if (approval){
      const updatedPasswords = passwordArr.filter(
        item => item.id !== id
      )
      setPasswordArr(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      toast.error("Password deleted successfully!");
      setForm({ url: "", username: "", password: "" });
      passwordRef.current.type = "password";
    }
  }

  const editPassword = (id) => {
    const edited = passwordArr.find(item => item.id === id);
    setForm({ url: edited.url, username: edited.username, password: edited.password });
    setPasswordArr(passwordArr.filter(item => item.id !== id));
  }

  return (
    <>
    <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick draggable pauseOnHover theme="dark"/>
    <div className="relative min-h-screen w-full flex flex-col align-center justify-center lg:align-baseline lg:justify-start lg:pt-4 gap-4 lg:pb-8 bg-gradient-to-br from-gray-950 via-neutral-950 to-black">
      <div className="flex">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-black to-gray-950 opacity-95"></div>
        <div className="relative z-10 text-gray-100 max-w-4xl mx-auto rounded-xl shadow-2xl mt-4 md:mt-8 bg-gradient-to-br from-neutral-900 via-gray-900 to-gray-800 bg-opacity-95 h-fit border border-gray-700">
            <h1 className="text-2xl md:text-4xl font-extrabold text-center p-4 md:p-6 tracking-wide drop-shadow-lg">
            <span className="text-emerald-400">&lt;</span>
            Lock
            <span className="text-emerald-400">Nest/&gt;</span>
            </h1>
            <p className="text-emerald-300 text-base md:text-lg text-center font-medium mb-2">
            Your own password manager
            </p>
            <div className="flex flex-col p-4 md:p-6 text-white items-center">
            <input
                type="text"
                className="border border-emerald-500 bg-gray-800 bg-opacity-70 p-2 md:p-3 rounded-xl mb-4 md:mb-5 w-full focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200 placeholder-emerald-300 text-sm md:text-base"
                placeholder="Enter Website Url"
                value={form.url}
                name="url"
                onChange={handlechange}
            />
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full justify-between mb-4 relative">
                <input
                type="text"
                className="border border-emerald-500 bg-gray-800 bg-opacity-70 rounded-xl w-full md:w-1/2 px-3 md:px-5 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200 placeholder-emerald-300 text-sm md:text-base"
                placeholder="Enter Username"
                value={form.username}
                name="username"
                onChange={handlechange}
                />
                <div className="relative w-full md:w-1/2">
                <input
                type="password"
                className="border border-emerald-500 bg-gray-800 bg-opacity-70 rounded-xl w-full px-3 md:px-5 py-2 md:py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200 placeholder-emerald-300 text-sm md:text-base"
                placeholder="Enter Password"
                value={form.password}
                name="password"
                onChange={handlechange} ref={passwordRef}
                />
                <span className="text-emerald-400 cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform duration-200">
                <lord-icon
                    src="https://cdn.lordicon.com/dicvhxpz.json"
                    trigger="click"
                    stroke="bold"
                    colors="primary:#34d399,secondary:#34d399"
                    style={{ width: "30px", height: "30px" }}
                    onClick={() => {
                        passwordRef.current.type = 
                        passwordRef.current.type === "password" ? "text" : "password";
                    }}
                ></lord-icon>
                </span>
                </div>
            </div>
            <button
                onClick={savePassword}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:cursor-pointer justify-center flex items-center w-fit mb-4 hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-lg font-semibold gap-2 text-sm md:text-base"
            >
                <lord-icon
                src="https://cdn.lordicon.com/tsrgicte.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#ffffff"
                style={{ width: "30px", height: "30px" }}
                ></lord-icon>
                Save Password
            </button>
            </div>
        </div>
      </div>
      <div className={`passwords mt-4 w-[90vw] md:w-[70vw] lg:w-[45vw] mx-auto px-4 md:px-0 ${passwordArr.length === 0 ? 'pb-8' : ''}`}>
        <h1 className="text-xl md:text-2xl font-bold text-white relative z-10 w-fit mx-auto">Your Passwords</h1>
        {passwordArr.length === 0 && 
        <p className="text-gray-400 text-center mt-2 mb-4 relative z-10 text-sm md:text-base">No passwords saved yet. Start by adding a new password!</p>}
        {passwordArr.length !== 0 && 
        <div className="overflow-x-auto">
        <table className="table-auto w-full max-w-4xl mx-auto mt-4 z-20 bg-gray-800 rounded-lg overflow-hidden shadow-lg relative md:min-w-[600px]">
            <thead className="bg-emerald-600 text-white">
                <tr>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-base">Site</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-base">Username</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-base">Password</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-base">Actions</th>
                </tr>
            </thead>
            <tbody className="text-gray-200">
                {passwordArr.map((item)=>{
                    return (
                        <tr className="border-b border-gray-700 " key={item.id}>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-base max-w-[80px] md:max-w-none"><a href={item.url} target="_blank" className="break-all truncate block">{item.url}</a></td>
                        <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-base max-w-[70px] md:max-w-none break-all truncate">{item.username}</td>
                        <td className="px-2 md:px-4 py-2 md:py-3 flex items-center text-xs md:text-base max-w-[80px] md:max-w-none">
                          <span className="truncate mr-1">{item.password}</span>
                          <img src="/images/copy.png" alt="copy icon" className="w-3 h-3 md:w-5 md:h-5 invert hover:cursor-pointer flex-shrink-0" onClick={()=>{
                          copyPassword(item.password);
                        }}/></td>
                        <td className="text-center px-1 md:px-2 md:pr-6">
                          <lord-icon
                              src="https://cdn.lordicon.com/exymduqj.json"
                              trigger="in"
                              state="in-dynamic"
                              colors="primary:#66d7ee,secondary:#0a4e5c"
                              style={{width:"24px",height:"24px", paddingRight: "4px"}}
                              onClick={() =>{
                                editPassword(item.id);
                              }}>
                          </lord-icon>
                          <lord-icon
                                src="https://cdn.lordicon.com/jzinekkv.json"
                                trigger="hover"
                                state="empty"
                                colors="primary:#c71f16,secondary:#e83a30"
                                style={{width:"24px",height:"24px", paddingRight: "4px"}}
                                onClick={() =>{
                                  deletePassword(item.id);
                                }}>
                          </lord-icon>
                        </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div> }
      </div>
    </div>
    </>
  );
};

export default Manager;