import useList from "./useList"

export default ()=>{
    const {list} = useList()
    return <>{JSON.stringify(list)}</>
}