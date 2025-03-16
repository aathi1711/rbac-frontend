import { jwtDecode } from "jwt-decode"
import { Navigate } from "react-router-dom"
const ProtectNurse= ({component}) =>{
  const token = localStorage.getItem('token')
  if(!token) return <Navigate to='/'/>
  let decode = jwtDecode(token)
  let role = decode.role
  if(role == 'Nurse'){
    return component
  } else{
    return <Navigate to='/'/>
  }
}
export default ProtectNurse;