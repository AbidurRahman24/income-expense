import axios from "axios"
import { useEffect, useReducer } from "react"
// step 1: create a function and write argument params and page
// step 2: import useReducer and defult value reducer, empty array, loading true. state and dispatch
// step 3: return jos: {}, loading false, error: false
// step 4: reducer fundction
// step 5: action object
// step 6: under reducer function accourting to action. write switch case and defult
// step 7: use useEffect for data load and use third party libery axios
const ACTION = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error'
}
const BASE_URL = 'https://jobs.github.com/positions.json'
function reducer(state, action){
    switch (action.type) {
        case ACTION.MAKE_REQUEST:
            return {loading:true, jobs: []}
        case ACTION.GET_DATA:
            return {...state, loading:false, jobs: action.payload.jobs}
        case ACTION.ERROR:
            return {...state, loading: false, error: action.payload.error, jobs:[]}
        default:
            return state
    }
}
export default function useFetchJobs(params, page){
    const [state, dispatch] = useReducer(reducer, {jobs: [],loading:true,})
    useEffect(()=>{
        const cancelToken = axios.CancelToken.source()
        dispatch({type: ACTION.MAKE_REQUEST})
        axios.get(BASE_URL,{
            cancelToken: cancelToken.token,
            params: {markdown: true, page:page, ...params}
        }).then(res =>{
            dispatch({ type: ACTION.GET_DATA, payload: {jobs: res.data}})
        }).catch(e =>{
            if (axios.isCancel(e)) return
            dispatch({ type: ACTION.ERROR, payload: {error: e}})
        })
        return () =>{
            cancelToken.cancel()
        }
    },[params, page])
    return state
}