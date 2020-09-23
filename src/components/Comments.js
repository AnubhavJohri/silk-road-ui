import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Redirect } from 'react-router-dom';
import { Dropdown , DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import { handleGetAllPosts } from "../actions/authedPost";
import CardComponent from './CardComponent';


class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        //console.log("im constructor===== " , this.props.allPosts);
    }


    render() {
        var postComments = this.props.comments;
        let comments ;
        comments = (
            <Dropdown.Menu>
                <Dropdown.Item >
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Be First One to Comment!"/>
                        <button className="btn btn-success">Post</button>
                    </div>
                </Dropdown.Item>
            </Dropdown.Menu>
        );

        return(
            <React.Fragment>
                <Dropdown >
                    {/* <span variant="success">Comments</span> */}
                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                    {postComments.length===0?comments:
                    (
                        <React.Fragment>
                            {postComments.map((c,i)=>{
                                            return (
                                                <div className="media-content">
                                                    <div className="content">
                                                    <p>
                                                        <strong>{c.commentId}</strong>
                                                        <br />
                                                        {c.comment}
                                                    </p>
                                                    </div>
                                                </div> 
                                            )
                                        })}
                        </React.Fragment>)
                    // (
                    //     <Dropdown.Menu>
                    //         <Dropdown.Item >
                    //             {postComments.map((c,i)=>{
                    //                 return (
                    //                    <p><strong>{c.comment}</strong></p>
                    //                 )
                    //             })}
                    //         </Dropdown.Item>
                    //     </Dropdown.Menu>
                    // )
                    }
                </Dropdown>
            </React.Fragment>
        )
    }
        
}


function mapStateToProps({ loggedUser, allPosts , Messages }) {
    return {
        loggedUser,
        allPosts ,
        Messages
    }
}

export default connect(mapStateToProps)(Comments);