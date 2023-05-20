const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
const { Provider } = ReactRedux

import { store } from "./store/store.js"

import { AppFooter } from "./cmps/app-footer.jsx"
import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { TodoIndex } from "./views/todo-index.jsx"
import { TodoDetails } from "./views/todo-details.jsx"
import { TodoEdit } from "./views/todo-edit.jsx"
import { UserProfile } from "./views/user-profile.jsx"



export function App() {
    return(
    <Provider store={store}>
        <Router>
            <section className="app ">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/todo" element={<TodoIndex />} />
                    <Route path="/user" element={<UserProfile />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/edit:todoId" element={<TodoEdit />} />
                    <Route path="/details:todoId" element={<TodoDetails />} />
                </Routes>
                <AppFooter />
            </section>
        </Router>
    </Provider>
)
}
