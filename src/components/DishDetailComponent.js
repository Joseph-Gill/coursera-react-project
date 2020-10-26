import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link} from "react-router-dom";

const RenderComments = ({comments}) => {
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
          <CardImg width="100%" src={dish.image} alt={dish.name}/>
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

const DishDetail = ({dish, comments}) => {
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
        <RenderComments comments={comments}/>
      </div>
    </div>
  );
}


export default DishDetail;