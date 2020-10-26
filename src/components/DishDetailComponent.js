import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";


class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderComments(comments) {
    if (comments) {
      return (
        <div>
          <h3>Comments</h3>
          <ul className="list-unstyled">
            {comments.map(comment => (
              <div key={comment.id} className="mb-3">
                <li>{comment.comment}</li>
                <li>{`-- ${comment.author} , ${new Intl.DateTimeFormat('en-us', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit'
                }).format(new Date(Date.parse(comment.date)))}`}</li>
              </div>))}
          </ul>
        </div>
      )
    } else {
      return <div/>
    }
  }

  renderDish(dish) {
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
            {this.renderComments(dish.comments)}
          </div>
        </div>
      );
    } else {
      return (
        <div/>
      );
    }
  }

  render() {
    return (
      <div className="container">
        {this.renderDish(this.props.dish)}
      </div>
    );
  }
}

export default DishDetail;