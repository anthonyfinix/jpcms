import React from "react";
import { UserContext } from "../../UserProvider";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

const UserWidget = ({ children, className, ...props }) => {
    const { user, setUser } = React.useContext(UserContext);
    const history = useHistory()
    const handleClick = () => {
        if (user) {
            setUser(null)
            localStorage.removeItem("JPtechSolutionAccessToken");
        }
        history.push('/login')
    }
    return (
        <div  {...props}>
            <Button onClick={handleClick} >{user ? user.username : "login"}</Button>
        </div>
    )
}
export default UserWidget;