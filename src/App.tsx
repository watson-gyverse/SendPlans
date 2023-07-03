import CreateProject from './CreateProject/CreateProject'
import FinishProject from './FinishProject/FinishProject'
import AllProjects from './AllProjects/AllProjects'
import Information from './Information/Information'
import Intro from './Intro/intro'
import NotFound from './NotFound'
import Main from './Main/Main'
import SideNav from './SideNav'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import Header from './Header/Header'
import { setUrl } from './Style/const'
import AwsRequest from './Aws/Aws'

export const GlobalStyle = createGlobalStyle`
  body{
    margin:0;
    padding:0;
    background-color: #262626;
}
`

function App() {
    console.log(process.env.PUBLIC_URL)
    return (
        <div style={{ whiteSpace: 'nowrap' }}>
            <BrowserRouter>
                <GlobalStyle />
                <Header />
                <StyledDiv>
                    <SideNav />
                    <Routes>
                        <Route
                            path={process.env.PUBLIC_URL}
                            element={<Intro />}
                        />
                        <Route
                            index
                            path={setUrl('/')}
                            element={<Intro />}
                        />

                        <Route
                            index
                            path={setUrl('/intro')}
                            element={<Intro />}
                        />
                        <Route
                            index
                            path={setUrl('/main')}
                            element={<Main />}
                        />
                        <Route
                            index
                            path={setUrl('/create/:storeName')}
                            element={<CreateProject />}
                        />
                        <Route
                            index
                            path={setUrl('/finish/:storeName')}
                            element={<FinishProject />}
                        />
                        <Route
                            index
                            path={setUrl('/all/:storeName')}
                            element={<AllProjects />}
                        />
                        <Route
                            index
                            path={setUrl('/info')}
                            element={<Information />}
                        />
                        <Route
                            index
                            path={setUrl('/upload')}
                            element={<AwsRequest />}
                        />
                        <Route
                            index
                            path={setUrl('/*')}
                            element={<NotFound />}
                        />
                    </Routes>
                </StyledDiv>
            </BrowserRouter>
        </div>
    )
}

const StyledDiv = styled.div`
    display: flex;
`

export default App
