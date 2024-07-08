import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

const MyCard = (props) => {
  const { title, dataDisplay, icon, bg, text } = props;
  return (
    <Card
      bg={bg}
      text={text}
      border="none"
      className="m-1 bg-gradient shadow-lg"
      style={{ width: "14rem" }}
    >
      <Card.Header>{icon}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{dataDisplay}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
