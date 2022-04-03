import React from 'react';

import Footer from "../../components/Footer";
import Timer from "../../components/Timer";
import Navbar from "../../components/Navbar";

const TimerPage = ({ user, setUser }) => {



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