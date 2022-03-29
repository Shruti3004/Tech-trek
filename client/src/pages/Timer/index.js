import React, { useState, useEffect } from 'react';
import { getDashboardInfo } from '../../api';
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
        return <div>Loading</div>
    }
    return (
        <div className="background">
            <Timer user={user} />
        </div>
    )
}

export default TimerPage