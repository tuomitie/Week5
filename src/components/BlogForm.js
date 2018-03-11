import React from 'react'

const NoteForm = ({handleChange, onSubmit, title, author, url}) => {
    return (
        <div>
            <h3>Lisää uusi blogi</h3>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="titleField">title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        id="titleField"
                        value={title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="authorField">author</label>
                    <input
                        type="text"
                        name="author"
                        className="form-control"
                        id="authorField"
                        value={author}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="urlField">url</label>
                    <input
                        type="text"
                        name="url"
                        className="form-control"
                        id="urlField"
                        value={url}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-success">tallenna</button>
            </form>
        </div>
    )
}


export default NoteForm