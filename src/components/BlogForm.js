import React from 'react'

const NoteForm = ({handleChange, onSubmit, title, author, url}) => {
    return (
        <div>
            <h2>Lisää uusi blogi</h2>

            <form onSubmit={onSubmit}>
                <div>title
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleChange}
                    />
                </div>
                <div>author
                    <input
                        type="text"
                        name="author"
                        value={author}
                        onChange={handleChange}
                    />
                </div>
                <div>url
                    <input
                        type="text"
                        name="url"
                        value={url}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">tallenna</button>
            </form>
        </div>
    )
}


export default NoteForm