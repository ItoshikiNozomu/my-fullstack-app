import { loginModalVisible } from "client/atoms"
import { useRecoilValue } from "recoil"
import LoginModal from "./LoginModal"

const GlobalContainer = ()=>{
    const loginModalVis = useRecoilValue(loginModalVisible)
    return <>
    <LoginModal visible={loginModalVis}></LoginModal>
    </>
}

export default GlobalContainer