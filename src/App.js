import React, {Component} from 'react'
import axios from 'axios'

class App extends Component{
    constructor(){
        super()
        this.state = {
            categories: []
        }
    }
    componentDidMount(){
        axios.get('/api/categories')
            .then((response)=>{return response.data})
            .then((categories)=>{console.log(categories)})
    }
    render(){
        const categories = this.state.categories
        return (
            <span > {categories.length} </span>
        )
    }

}

export default App