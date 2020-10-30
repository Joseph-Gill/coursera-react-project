import React, {Component} from 'react';
import {
  Card, CardBody, CardImg, CardText, CardTitle,
  Breadcrumb, BreadcrumbItem, Row, Label, Button,
  Modal, ModalHeader, ModalBody
} from "reactstrap";
import {Control, LocalForm, Errors} from "react-redux-form";
import {Link} from "react-router-dom";
import {Loading} from "./LoadingComponent";
import {baseUrl} from "../shared/baseURL";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  render() {
    return (
      <>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-lg fa-pencil"/> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <div className="col-12">
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row>
                  <Label htmlFor="rating">Rating</Label>
                </Row>
                <Row>
                  <Control.select model=".rating" name="rating" className="form-control mb-3">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Row>
                <Row>
                  <Label htmlFor="author">Your Name</Label>
                </Row>
                <Row>
                  <Control.text model=".author" name="author"
                                className="form-control mb-3"
                                placeholder="Your Name"
                                validators={{
                                  required,
                                  minLength: minLength(3),
                                  maxLength: maxLength(15)
                                }}
                  />
                  <Errors model=".author" className="text-danger"
                          show="touched"
                          messages={{
                            required: "Required",
                            minLength: "Must be greater than 2 characters",
                            maxLength: "Must be 15 characters or less"
                          }}
                  />
                </Row>
                <Row>
                  <Label htmlFor="comment">Comment</Label>
                </Row>
                <Row>
                  <Control.textarea model='.comment' id='comment' name='comment'
                                    rows='6'
                                    className='form-control mb-3'/>
                </Row>
                <Row>
                  <Button type="submit" color="primary">Submit</Button>
                </Row>
              </LocalForm>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const RenderComments = ({comments, postComment, dishId}) => {
  if (comments) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comments.map(comment => (
            <div key={comment.id} className="mb-3">
              <li><p>{comment.comment}</p>
                <p>{`-- ${comment.author} , ${new Intl.DateTimeFormat('en-us', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit'
                }).format(new Date(Date.parse(comment.date)))}`}</p></li>
            </div>))}
        </ul>
        <CommentForm dishId={dishId} postComment={postComment}/>
      </div>
    )
  } else {
    return <div/>
  }
}

const RenderDish = ({dish}) => {
  if (dish) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={`${baseUrl}${dish.image}`} alt={dish.name}/>
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div/>
  }
}

const DishDetail = ({dish, comments, postComment, isLoading, errMess}) => {
  if (isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading/>
        </div>
      </div>
    );
  } else if (errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{errMess}</h4>
        </div>
      </div>
    );
  }
  if (dish) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{dish.name}</h3>
            <hr/>
          </div>
        </div>
        <div className="row">
          <RenderDish dish={dish} comments={comments}/>
          <RenderComments comments={comments} postComment={postComment} dishId={dish.id}/>
        </div>
      </div>
    );
  }
}

export default DishDetail;