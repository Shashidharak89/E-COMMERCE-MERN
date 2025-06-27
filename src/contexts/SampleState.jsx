import { useState } from "react";
import SampleContext from "./SampleContext";


export const SampleState = ({ children }) => {
    const URL = "http://localhost:5000";
    const [username, setUsername] = useState();
    const [userId, setUserId] = useState();
    const [mail, setMail] = useState();
    const [islogin, setIslogin] = useState(false);

    const [plot1, setPlot1] = useState(18);
    const [plot2, setPlot2] = useState(18);


    return (
        <SampleContext.Provider value={{
            URL,
            userId, setUserId,
            username, setUsername,
            mail, setMail,
            islogin, setIslogin,
            plot1,setPlot1,
            plot2,setPlot2
        }}>
            {children}
        </SampleContext.Provider>
    );
};
