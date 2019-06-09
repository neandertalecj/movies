import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types'

const initialState = {
    items: {},
    favorit: [],
    loading: false
}

export default function(state = initialState, action) {
     switch (action.type) {
        case GET_ITEMS:
            // console.log('111 GET_ITEMS', action.payload.topartists.artist)
            return {
                ...state,
                items: action.payload.topartists,
                loading: false 
            }
        case DELETE_ITEM:
            return {
                ...state,
                favorit: state.favorit.filter(item => item.listeners !== action.payload)
            }
        case ADD_ITEM:
        return {
                ...state,
                favorit: [
                    state.items.artist.find(value => action.payload === value.listeners), 
                    ...state.favorit
                ]
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}