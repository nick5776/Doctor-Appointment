import React from 'react'
import Layout from "../components/Layout";
import {notification, Tabs, message} from "antd";
import { useDispatch, useSelector } from 'react-redux'; //You want to tell Redux to do something — like change some state. To do that, you dispatch an action using useDispatch.
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { setUser } from '../redux/features/userSlice'; // your user slice action

const NotificationPage = () => {
    const {user} = useSelector(state=> state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleMarkAllRead = async()=>{
        try{
            dispatch(showLoading());
            const res = await axios.post("/api/v1/user/get-all-notification", {userId:user._id}, // jab admin mark all read pe click kre toh sari notifs wha se hat jayegi
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            }
            )
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                dispatch(setUser(res.data.data)); 
                /*
                if updated user was not returned by backend then we have to update redux state here by

                dispatch(setUser({
                    ...user,
                    seennotification: [...user.seennotification, ...user.notification],
                    notification: [],
                }));
                Redux update is imp b/c
                After that API call, your Redux user state is still the old one. So on the frontend:
                user.notification still has old data ➝ unread notifs still show 
                */
            } else {
                message.error(res.data.message);
            }
        }
        catch(error){
            dispatch(hideLoading()); //to ensure the spinner is turned off even if the API call fails
            console.log(error);
            message.error("Something Went Wrong");
        }
    }

    const handleDeleteAllRead = async()=>{
        try{
            dispatch(showLoading());
            const res = await axios.post("/api/v1/user/delete-all-notification", {userId:user._id}, // jab admin delete all notifs pe click kre toh sari notifs wha se hat jayegi
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            }
            )
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                dispatch(setUser(res.data.data)); 
            } else {
                message.error(res.data.message);
            }
        }
        catch(error){
            dispatch(hideLoading()); //to ensure the spinner is turned off even if the API call fails
            console.log(error);
            message.error("Something Went Wrong");
        }
    }
  return (
    <Layout>
        <h4 className='p-3 text-center'>Notification Page</h4>
        <Tabs>
            <Tabs.TabPane tab="UnRead" key={0}>
                <div className="d-flex justify-content-end">
                    <h4 className="p-2" onClick={handleMarkAllRead} style={{ cursor: "pointer" }}>Mark All Read</h4>
                </div>

                <div>
                    {user?.notification.map((notificationMsg, index) => (
                        <div className="card m-2" key={index} style={{cursor:'pointer'}}>
                            <div className="card-text">{notificationMsg.message}</div>
                        </div>
                ))}
                </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Read" key={1}>
                <div className='d-flex justify-content-end' >
                    <h4 className='p-2 text-primary' onClick={handleDeleteAllRead} style={{ cursor: "pointer" }}>Delete All Read</h4>
                </div>
                <div>
                    {user?.seennotification.map((notificationMsg, index) => (
                        <div className="card m-2" key={index} style={{cursor:'pointer'}}>
                            <div className="card-text">{notificationMsg.message}</div>
                        </div>
                ))}
                </div>
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default NotificationPage
