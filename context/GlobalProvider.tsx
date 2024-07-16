import {createContext, useContext, useState, useEffect, Dispatch, SetStateAction} from 'react';
import { getCurrentUser } from '@/lib/appWrite';


type GlobalContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    user: any;
    setUser: Dispatch<SetStateAction<any>>;
    isLoading: boolean;
}

const GlobalContext = createContext<GlobalContextType>(null!);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if(res) {
                    setIsLoggedIn(true)
                    setUser(res)
                } else {
                    setIsLoggedIn(false);
                    setUser(null)
                }
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false)
            });
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider