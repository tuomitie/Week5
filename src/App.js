import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

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
            addFormVisible: false
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
            this.setState({
                error: 'käyttäjätunnus tai salasana virheellinen',
            })
            setTimeout(() => {
                this.setState({error: null})
            }, 5000)
        }
    }

    addBlog = (e) => {
        e.preventDefault()
        this.blogForm.toggleVisibility()
        console.log(this.state.title)
        try {
            const blogObject = {
                title: this.state.title,
                author: this.state.author,
                url: this.state.url
            }
            console.log(blogObject)
            blogService
                .create(blogObject)
                .then(newBlog => {
                    this.setState({
                        blogs: this.state.blogs.concat(newBlog),
                        title: '',
                        author: '',
                        url: ''
                    })
                })

        } catch (exception) {
            console.log(exception)
        }

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
                <Notification message={this.state.error} />
                <div>{this.state.user.name} logged in <form onSubmit={this.logout}>
                    <button type="submit" name="logout" onClick={this.handleLogout}>logout</button>
                </form></div>

                <div>
                    {this.state.blogs.map(blog =>
                        <Blog key={blog._id} blog={blog}/>
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
