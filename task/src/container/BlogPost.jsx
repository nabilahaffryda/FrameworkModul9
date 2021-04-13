import React, {Component} from "react";
import './BlogPost.css';
import Post from "../component/Post";
import '../services/index';
import API from "../services/index";

class BlogPost extends Component{
    state = {           
        listStudent: [], 
        insertStudent: {
            id: 1,
            NIM: 1,
            nama: "",
            alamat:"",
            hp:"",
            angkatan: 1,
            status: "",
        }
    }
    getDataFromServerAPI = () => {
        API.getNewsBlog().then((result) => {
            this.setState({
                listStudent: result,
            });
        });
    };
    componentDidMount(){
        this.getDataFromServerAPI();
    }

    handleSaveButton = () => {
        API.postNewsBlog(this.state.insertStudent)
        .then((response) => {
            this.getDataFromServerAPI();
        });
    };

    handleAdd = (event) => {
        let formInsertStudent = { ...this.state.insertStudent };
        let timestamp = new Date().getTime();
        formInsertStudent['id'] = timestamp;
        formInsertStudent[event.target.name] = event.target.value;
        this.setState({ insertStudent: formInsertStudent, });
    };

    handleDelete = (data) => {
        API.deleteNewsBlog(data).then((response) => {
                this.getDataFromServerAPI();
            });
    };
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <div className="post-student">
                            <div className="form pb-2">
                                <h2 className="title text center">Input New Student Data</h2><br></br>
                                    <div className="student-form">
                                        <div className="form-group row">
                                            <label htmlFor="NIM" className="col-sm-2 col-form-label">NIM</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="NIM" name="NIM" onChange={this.handleAdd}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                        <label htmlFor="nama" className="col-sm-2 col-form-label">Name</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="nama" name="nama" onChange={this.handleAdd}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="alamat" className="col-sm-2 col-form-label">Address</label>
                                            <div className="col-sm-10">
                                                <textarea type="text" className="form-control" id="alamat" name="alamat" rows="3" onChange={this.handleAdd}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="hp" className="col-sm-2 col-form-label"> Handphone</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="hp" name="hp" onChange={this.handleAdd} />
                                                </div>
                                            </div>
                                        <div className="form-group row">
                                            <label htmlFor="angkatan" className="col-sm-2 col-form-label">Year</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="angkatan" name="angkatan" onChange={this.handleAdd}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="status" name="status" onChange={this.handleAdd}/>
                                            </div>
                                        </div><br></br>
                                        <button type="submit" className="btn btn-primary" id="simpan" onClick={this.handleSaveButton}>Save</button>
                                    </div>  
                                </div>
                            </div>
                    </div>
              <div className="col-sm">
                <div className="content">
                    <h2 className="title text center">List of Student</h2>
                    <div className="content-form">
                        {this.state.listStudent.map((student) => {
                                return (<Post 
                                    key={student.id} 
                                    idStd={student.id}
                                    nimStd={student.NIM}
                                    namaStd={student.nama}
                                    alamatStd={student.alamat}
                                    noStd={student.hp}
                                    angkatanStd={student.angkatan}
                                    statusStd={student.status}
                                    deleteStd={this.handleDelete}/>
                                );
                            })}
                    </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
}
export default BlogPost;