const loginForm = () => {
    const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
    const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={e => this.setState({ loginVisible: true })}>log in</button>
            </div>
            <div style={showWhenVisible}>
                <LoginForm
                    visible={this.state.visible}
                    username={this.state.username}
                    password={this.state.password}
                    handleChange={this.handleLoginFieldChange}
                    handleSubmit={this.login}
                />
                <button onClick={e => this.setState({ loginVisible: false })}>cancel</button>
            </div>
        </div>
    )
}