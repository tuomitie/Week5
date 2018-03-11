import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import TogglableTextbox from "./components/TogglableTextbox";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Vikalla viikolla en saanut blogeja ladattua backendistä, joten laitoin pari kovakoodattuna että sain tehtävät tehtyä.
            blogs: [
                {
                    _id: "5a68a2fe66b3369ab8d7798f",
                    title: "Go To Statement Considered Harmful",
                    author: "Edsger W. Dijkstra",
                    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
                    likes: 7,
                    __v: 0
                },
                {
                    _id: "5a68a5656a34d29c71cecf11",
                    title: "Continuous integration sertification",
                    author: "Martin Fowler",
                    url: "https://martinfowler.com/bliki/ContinuousIntegrationCertification.html",
                    likes: 1,
                    user: {
                        _id: "5a68a2ff66b3369ab8d77992",
                        username: "hellas",
                        name: "Arto Hellas"
                    },
                    __v: 0
                },
            ],
            error: null,
            username: '',
            password: '',
            user: null,
            title: '',
            author: '',
            url: '',
            addFormVisible: false,
            notification: ''
        }
    }

    componentWillMount() {
        // blogService.getAll().then(blogs =>
        //     this.setState({ blogs })
        // )
        console.log(this.state)
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.setState({user})
            blogService.setToken(user.token)
        }
    }

    login = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            })
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

            blogService.setToken(user.token)
            this.setState({username: '', password: '', user})
        } catch (exception) {
            this.notification(`virhe tunnistautumisessa`)
            setTimeout(() => {
                this.setState({notification: ''})
            }, 7000)
        }
    }

    addBlog = async (event) => {
        event.preventDefault()
        this.blogForm.toggleVisibility()
        try {
            const blogObject = {
                title: this.state.title,
                author: this.state.author,
                url: this.state.url
            }

            const newBlog = await blogService.create(blogObject)
            this.notification(`a new blog ${this.state.title} by ${this.state.author} was added succesfully!`)
            this.setState({
                blogs: this.state.blogs.concat(newBlog),
                title: '',
                author: '',
                url: ''
            })
        } catch (exception) {
            this.notification(`blog addition failed`)
            console.log(exception)
        }

    }

    notification = (message) => {
        this.setState({
            notification: message
        })
        setTimeout(() => {
            this.setState({notification: ''})
        }, 7000);
    }

    handleFieldChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleLogout = (event) => {
        window.localStorage.removeItem('loggedBlogappUser')
        this.setState({ user: null })
    }

    render() {
        if (this.state.user === null) {
            return (
                <div className="row my-3 no-gutters">
                    <Notification notification={this.state.notification}/>
                    <h1 className="display-4">Kirjaudu sovellukseen</h1>
                    <form className="col-12 mt-2" onSubmit={this.login}>
                        <div className="form-group">
                            <label htmlFor="nameField">käyttäjätunnus</label>
                            <input
                                type="text"
                                name="username"
                                className="form-control w-50"
                                id="nameField"
                                value={this.state.username}
                                onChange={this.handleFieldChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passField">salasana</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control w-50"
                                id="passField"
                                value={this.state.password}
                                onChange={this.handleFieldChange}
                            />
                        </div>
                        <button className="btn" type="submit">kirjaudu</button>
                    </form>
                </div>
            )
        }

        return (
            <div>
                <div className="row no-gutters my-3">
                    <div className="col-6">
                        <h1 className="display-4">blogs</h1>
                    </div>

                    <div className="card col-6 border-white">
                        <div className="card-body text-right">
                            <span className="d-inline-block">{this.state.user.name} logged in</span>
                            <form className="d-inline pl-2" onSubmit={this.logout}>
                                <button type="submit" className="btn btn-sm mb-1" name="logout"
                                        onClick={this.handleLogout}>logout
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row mb-3 no-gutters">
                    <Notification notification={this.state.notification}/>
                    <div className="col-12">
                        {this.state.blogs.map(blog =>
                            <TogglableTextbox header={blog.title} key={blog._id} ref={component => blog = component} >
                                <Blog blog={blog}/>
                            </TogglableTextbox>
                        )}
                    </div>
                </div>
                <div className="row no-gutters">
                    <Togglable className="w-100" buttonLabel="new blog" ref={component => this.blogForm = component}>
                        <BlogForm
                            handleChange={this.handleFieldChange}
                            onSubmit={this.addBlog}
                            title={this.state.title}
                            author={this.state.author}
                            url={this.state.url}
                        />
                    </Togglable>
                </div>
            </div>
        )
    }
}

export default App;