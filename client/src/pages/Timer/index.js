import React, { useState, useEffect } from 'react';
import { getDashboardInfo } from '../../api';
import Footer from "../../components/Footer";
import Timer from "../../components/Timer";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";

const TimerPage = () => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getDashboardInfo().then(res => {
            setUser(res);
            setLoading(false);
        });
    }, [])

    if (loading) {
        return <div className="h-screen w-screen"> <div className="bg-bg-primary h-full w-full flex justify-center items-center"><Loader /></div></div>
    }
    return (
        <div className="background">
            <Navbar />
            <div className="mt-[8rem] md:mt-[10rem] lg:mt-[12rem] xl:mt-[14rem]">
                <Timer user={user} setUser={setUser} />
            </div>
            <Footer />
        </div>
    )
}

export default TimerPage