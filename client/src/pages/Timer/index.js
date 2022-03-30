import React, { useState, useEffect } from 'react';
import { getDashboardInfo } from '../../api';
import Loader from '../../components/Loader';
import Timer from "../../components/Timer";


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
        return <div><Loader /></div>
    }
    return (
        <div className="background">
            <Timer user={user} setUser={setUser} />
        </div>
    )
}

export default TimerPage