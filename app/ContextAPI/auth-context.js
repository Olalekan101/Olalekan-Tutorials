"use client"
import { Context, createContext } from "react"
import { auth } from "@/lib/firebase"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth';

export const AuthContext = createContext({
    user:'',
    loading:"",
    googlesignin:async()=>{},
    logout:async()=>{}
})

export default function AuthenticationProvider({children}){

    const [user, loading] = useAuthState(auth)
    const googleProvider = new GoogleAuthProvider(auth)

    const googlesignin = async ()=>{
        try {
            signInWithPopup(auth,googleProvider)
        } catch (error) {
            throw error
        }
    }
    const logout = ()=>{
        signOut(auth)
    }

    const values = {
        user,
        loading,
        googlesignin,
        logout
    }

    return <AuthContext.Provider value={values} >{children}</AuthContext.Provider>
}