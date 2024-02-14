import { useState } from "react";
import propTypes from "prop-types"
import { context } from "./context";

const ContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState(null)
  const [user, setUser] = useState(null)
  const [auth, setAuth] = useState(null)
  const [userId, setUserId] = useState(null)


  return (
    <context.Provider value={{
      blogs, setBlogs,
      user, setUser,
      auth, setAuth,
      userId, setUserId
    }}>
      {children}
    </context.Provider>
  )
}

ContextProvider.propTypes = {
  children: propTypes.element.isRequired
}

export default ContextProvider