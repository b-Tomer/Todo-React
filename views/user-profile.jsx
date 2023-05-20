const { useSelector, useDispatch } = ReactRedux

import { userService } from "../services/user.service.js";
import { SET_USER, USER_STYLE } from "../store/store.js";


export function UserProfile() {
    const dispatch = useDispatch()
    const user = userService.getLoggedinUser()
    const userStyle = useSelector((storeState) => storeState.userStyle)


    function handelNameChange(ev) {
        const val = ev.target.value
        user.fullname = val
        dispatch({ type: SET_USER, user })
        userService.editUser(val)
    }

    function onBgColorChange(ev) {
        const userStyleToEdit = { ...userStyle }
        const val = ev.target.value
        userStyleToEdit.backgroundColor = val
        dispatch({ type: USER_STYLE, userStyleToEdit })
    }


    return (
        <div style={userStyle} className="user-profile">

            <h1>personal details</h1>
            <h3>Name: {user.fullname}</h3>
            <input className="" type="text" placeholder="change name?" onChange={handelNameChange} />
            <input type="color" onChange={onBgColorChange} />
            <h4>Activities:</h4>
            <ul>
                {user.activities.map((activity, index) => (
                    <li key={index}>{activity.txt} - {activity.At}</li>
                ))}
            </ul>

        </div>

    )
}