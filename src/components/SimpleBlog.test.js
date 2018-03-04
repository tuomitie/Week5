import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it('renders content', () => {
        const blog = {
            title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
            author: 'Artti Mahtisaari'
        }

        const noteComponent = shallow(<SimpleBlog blog={blog} />)
        const contentDiv = noteComponent.find('.header')

        expect(contentDiv.text()).toContain(blog.title)
    })
})