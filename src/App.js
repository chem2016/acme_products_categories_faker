import React, {Component} from 'react'
import axios from 'axios'
import List from './List'

class App extends Component{
    constructor(){
        super()
        this.state = {
            categories: []
        }
        this.createCategory = this.createCategory.bind(this);
    }
    componentDidMount(){
        axios.get('/api/categories')
            .then((response)=>{return response.data})
            .then((categories)=>{this.setState({categories})})
            //.then(()=>{console.log(this.state.categories)})
    }

    createCategory(){
        console.log('createCategory')
        axios.post('/api/categories')
            .then((response)=>{return response.data})
            .then((category)=>{
                const categories = this.state.categories
                categories.push(category)
                this.setState({categories})
            })
    }

    render(){
        const {createCategory} = this
        const categories = this.state.categories
        return (
            <div>
                <button onClick={ createCategory }>CreateCategory</button>
                <List categories={categories} />
            </div>
        )
    }

}

export default App