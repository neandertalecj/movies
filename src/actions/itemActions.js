import axios from 'axios'
import {Conf} from '../Conf/path'
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types'

const { BASE_PATH, API_KEY, METHOD, YOUR_API_KEY, FORMAT, COUNTRY, COUNTRY_NAME } = Conf

export const getItems = (page) => dispatch => {
    dispatch(setItemsLoading())
    axios
        .get(`${BASE_PATH}/?${METHOD}&${COUNTRY}${COUNTRY_NAME}&${API_KEY}${YOUR_API_KEY}&${FORMAT}&page=${page}`)
        .then(res => 
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            }))
}

export const deleteItem = id => dispatch => {
    // axios.delete(`/api/items/${id}`).then( res =>
    //     dispatch({
    //         type: DELETE_ITEM,
    //         payload: id
    //     })
    // )
    const remove = id => {
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
    }
    remove(id)
}

export const addItem = id => dispatch => {
    const add = id => {
        dispatch({
            type: ADD_ITEM,
            payload: id
        })
    }
    add(id)
}

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}