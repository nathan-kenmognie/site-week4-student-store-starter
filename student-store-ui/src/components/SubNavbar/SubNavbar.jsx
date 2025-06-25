import "./SubNavbar.css"
import {Link, useLocation} from "react-router-dom"
function SubNavbar({ activeCategory, setActiveCategory, searchInputValue, handleOnSearchInputChange, handleSearchType}) {


  const categories = ["All Categories", "Accessories", "Apparel", "Books", "Snacks", "Supplies"];
  const location = useLocation()

  const getSearchPlaceholder = () =>{
    console.log(location)
    if (location.pathname==="/orders"){
      return 'Email'
    }else{
      return 'Item Name'
    }
  }

  const handleInputChange = (e) =>{
    const value = e.target.value;

    handleOnSearchInputChange(e)
    handleSearchType(value,location.pathname)
  
  }





  return (
    <nav className="SubNavbar">

      <div className="content">

        <div className="row">
          <div className="search-bar">
            <input
              type="text"
              name="search"
              placeholder={getSearchPlaceholder()}
              value={searchInputValue}
              onChange={handleInputChange}
            />
            <i className="material-icons">search</i>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/orders" className="nav-link">Past Orders</Link>
          </div>
        </div>

        <div className="row">
          <ul className={`category-menu`}>
            {categories.map((cat) => (
              <li className={activeCategory === cat ? "is-active" : ""} key={cat}>
                <button onClick={() => setActiveCategory(cat)}>{cat}</button>
              </li>
            ))}
           
          </ul>
        </div>
        
      </div>
    </nav>
  )
}

export default SubNavbar;