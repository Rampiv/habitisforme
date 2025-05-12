import { Route, Routes } from "react-router"
import { LoginPage, MainPage } from "./pages"
import React from "react"
import "./App.scss"
import { AppContextProvider } from "./context/contextProvider"

const LoginPageMemo = React.memo(LoginPage)
const MainPageMemo = React.memo(MainPage)

export default function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <Routes>
          <Route path="/" element={<MainPageMemo />} />
        </Routes>
      </AppContextProvider>
    </div>
  )
}
