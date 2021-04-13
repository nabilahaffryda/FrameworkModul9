import React from "react";

const Post = (props) => {
    return(
        <div className="student">
            <div className="student-picture">
                <img src="http://placeimg.com/80/80/tech" alt="student Thumbnail Picture"/>
            </div>
            <div className="student-content">
                <div className="student-title">{props.namaStd}</div>
                <p className="contents-student">NIM : {props.nimStd}</p>
                <p className="contents-student">Address : {props.alamatStd}</p>
                <p className="contents-student">Phone Number : {props.noStd}</p>
                <p className="contents-student">Year : {props.angkatanStd}</p>
                <p className="contents-student">Status : {props.statusStd}</p>
                <button type="reset" className="btn btn-sm btn-danger" onClick={() => props.deleteStd(props.idStd)}>Delete</button>
            </div>
        </div>
    )
}
export default Post;