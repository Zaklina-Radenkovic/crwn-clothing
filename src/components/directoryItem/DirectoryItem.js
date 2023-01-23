import { useNavigate } from "react-router-dom";
import "./DirectoryItem.scss";

const DirectoryItem = (props) => {
  const { title, imageUrl, route } = props.category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="directory-body">
        <h2>{title}</h2>
        <p onClick={onNavigateHandler}>Shop Now</p>
      </div>
    </div>
  );
};
export default DirectoryItem;
