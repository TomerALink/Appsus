const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { MailDetails } from "./apps/mail/pages/MailDetails.jsx"
import { MailCompose } from "./apps/mail/cmps/MailCompose.jsx"
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"




export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} >
                <Route path="/mail/newMail" element={<MailCompose/>}/>
                </Route>
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/mail/:mailId" element={<MailDetails/>}/>
            </Routes>
        </section>
    </Router>
}
