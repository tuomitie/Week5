import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

import './app.css'
import TogglableTextbox from "./components/TogglableTextbox";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
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

    componentDidMount() {
        blogService.getAll().then(blogs =>
            this.setState({blogs})
        )

        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
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
                this.setState({notification: null})
            }, 5000)
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
            this.setState({ notification: null })
        }, 7000);
    }

    handleFieldChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleLogout = (event) => {
        window.localStorage.removeItem('loggedBlogappUser')
    }

    render() {
        if (this.state.user === null) {
            return (
                <div>
                    <Notification notification={this.state.notification} />
                    <h2>Kirjaudu sovellukseen</h2>
                    <form onSubmit={this.login}>
                        <div>
                            käyttäjätunnus
                            <input
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleFieldChange}
                            />
                        </div>
                        <div>
                            salasana
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleFieldChange}
                            />
                        </div>
                        <button type="submit">kirjaudu</button>
                    </form>

                </div>
            )
        }

        return (
            <div>
                <h2>blogs</h2>
                <Notification notification={this.state.notification} />
                <div>{this.state.user.name} logged in <form onSubmit={this.logout}>
                    <button type="submit" name="logout" onClick={this.handleLogout}>logout</button>
                </form></div>

                <div>
                    {this.state.blogs.map(blog =>
                        <TogglableTextbox header={blog.title} key={blog._id} ref={component => blog = component}>
                            <Blog blog={blog} />
                        </TogglableTextbox>
                    )}
                </div>

                <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
                    <BlogForm
                        handleChange={this.handleFieldChange}
                        onSubmit={this.addBlog}
                        title={this.state.title}
                        author={this.state.author}
                        url={this.state.url}
                    />
                </Togglable>


            </div>
        )
    }
}

export default App;
