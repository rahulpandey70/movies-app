import React, { Component } from 'react'
import Banner from '../components/Banner'
import MovieList from '../components/MovieList'

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <Banner/>
                <MovieList/>
            </div>
        )
    }
}
