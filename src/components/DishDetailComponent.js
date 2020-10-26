import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

const RenderComments = ({comments}) => {
  if (comments) {
    return (
      <>
        <h3>Comments</h3>
        <ul className="list-unstyled">
          {comments.map(comment => (
            <div key={comment.id} className="mb-3">
              <li><p>{comment.comment}</p></li>
              <li><p>{`-- ${comment.author} , ${new Intl.DateTimeFormat('en-us', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
              }).format(new Date(Date.parse(comment.date)))}`}</p></li>
            </div>))}
        </ul>
      </>
    )
  } else {
    return <div/>
  }
}

const RenderDish = ({dish}) => {
  if (dish) {
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={dish.comments} />
        </div>
      </div>
    );
  } else {
    return <div/>
  }
}

const DishDetail = ({dish}) => {
  return (
    <div className="container">
      <RenderDish dish={dish} />
    </div>
  );
}


export default DishDetail;