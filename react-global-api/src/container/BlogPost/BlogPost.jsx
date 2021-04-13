import React, {Component} from "react";
import './BlogPost.css';
import Post from "../../component/BlogPost/Post";
import '../../services/index';
import API from "../../services/index";

class BlogPost extends Component{
    state = {           
        listArticle: [], 
        insertArticle: {
            userId: 1,
            id: 1,
            title: "",
            body:""
        }
    }
    getDataFromServerAPI = () => {
        API.getNewsBlog().then((result) => {
            this.setState({
                listArticle: result,
            });
        });
    };
    componentDidMount(){
        this.getDataFromServerAPI();
    }

    handleSaveButton = () => {
        API.postNewsBlog(this.state.insertArticle)
        .then((response) => {
            this.getDataFromServerAPI();
        });
    };

    handleAddArticle = (event) => {
        let formInsertArticle = { ...this.state.insertArticle };
        let timestamp = new Date().getTime();
        formInsertArticle['id'] = timestamp;
        formInsertArticle[event.target.name] = event.target.value;
        this.setState({ insertArticle: formInsertArticle, });
    };

    handleDeleteArticle = (data) => {
        API.deleteNewsBlog(data).then((response) => {
                this.getDataFromServerAPI();
            });
    };
    render(){
        return(
            <div className="post-article">
                <div className="form pb-2 border-bottom"><br></br>
                    <div className="form-group row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-6">
                            <textarea className="form-control" id="title" name="title" rows="1" onChange={this.handleAddArticle}></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Content</label>
                        <div className="col-sm-6">
                            <textarea className="form-control" id="body" name="body" rows="3" onChange={this.handleAddArticle}></textarea>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleSaveButton}>Save</button>
                </div>
                <br></br>
                <h2>List of Article</h2><br></br>
                {
                    this.state.listArticle.map((article) => {
                        return (<Post key={
                            article.id} 
                            title={article.title} 
                            content={article.body} 
                            idArticle={article.id} 
                            deleteArticle={this.handleDeleteArticle}/>
                        );
                    })
                }
            </div>
        );
    }
}
export default BlogPost;

// getDataFromServerAPI =() => {
//     fetch('http://localhost:3001/posts?_sort=id&_order=desc')
//     .then(response => response.json())
//     .then(jsonResultFromAPI => {
//         this.setState({
//             listArticle: jsonResultFromAPI
//         })
//     })
// }
// handleSaveButton = () => {
//     fetch('http://localhost:3001/posts', {
//         method: 'post',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         }, 
//         body: JSON.stringify(this.state.insertArticle)
//     })
//         .then((Response) => {
//             this.getDataFromServerAPI();
//         });
// }
// handleDeleteArticle = (data) => {
//     fetch(`http://localhost:3001/posts/${data}`, {method: 'DELETE'})
//         .then(res => {
//             this.getDataFromServerAPI();
//         })
// }