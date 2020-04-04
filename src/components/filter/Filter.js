import React from 'react';
import './Filter.css';

const style = {
  number : {'width': '25%', 'margin-left':'10px'},
  textarea : {'width': '25%', 'margin-left':'10px'},
  date : {'width': '40%', 'margin-left':'10px'},
  select: {'width': '50%', 'margin-left':'10px'},
  sort: {'width': '25%', 'margin-left':'10px'},
}

const getConditions = (props) => {
  return (
    <div>
      <input 
        type="radio" 
        id="any" 
        value="ANY" 
        checked={props.require === "ANY"}
        onChange={props.handleRequireChange}
      />
      <label for="any">ANY</label>
      <input 
        type="radio" 
        id="all" 
        value="ALL" 
        checked={props.require === "ALL"}
        onChange={props.handleRequireChange}
      />
      <label for="all">ALL</label><br/><br/>

      <input 
        type="checkbox" id="gid_check" value="gid"
        onChange={props.handleColumnCheck} checked={props.gid_check}/>
      <label className="conditions" for="gid_check">GID</label>
      <select 
        className="comparator" 
        id="gid_comparator" 
        value={props.gid_comparator} 
        onChange={props.handleFormChange}>
        <option value="<">&lt;</option>
        <option value="<=">&lt;=</option>
        <option value="=">=</option>
        <option value=">=">&gt;=</option>
        <option value=">">&gt;</option>
        <option value="!=">!=</option>
      </select>
      <input 
        type="number" 
        id="gid_value" 
        style={style.number}
        value={props.gid_value}
        onChange={props.handleFormChange}
      />
      <br/>
      <input 
        type="checkbox" id="title_check" value="title" 
        onChange={props.handleColumnCheck} checked={props.title_check}/>
      <label className="conditions" for="title_check">Title</label>
      <select 
        className="comparator" 
        id="title_comparator" 
        value={props.title_comparator} 
        onChange={props.handleFormChange}>
        <option value="=">=</option>
        <option value="LIKE">LIKE</option>
      </select>
      <input
        type="textarea"
        id="title_value"
        style={style.textarea}
        value={props.title_value}
        onChange={props.handleFormChange}
      />
      <br/>
      <input 
        type="checkbox" id="releaseDate_check" value="releaseDate" 
        onChange={props.handleColumnCheck} checked={props.releaseDate_check}/>
      <label className="conditions" for="releaseDate_check">Released</label>
      <select 
        className="comparator" 
        id="releaseDate_comparator" 
        value={props.releaseDate_comparator} 
        onChange={props.handleFormChange}>
        <option value="<">&lt;</option>
        <option value="<=">&lt;=</option>
        <option value="=">=</option>
        <option value=">=">&gt;=</option>
        <option value=">">&gt;</option>
        <option value="!=">!=</option>
      </select>
      <input 
        type="date"
        id="releaseDate_value"
        style={style.date}
        value={props.releaseDate_value}
        onChange={props.handleFormChange}
      />
      <br/>
      <input 
        type="checkbox" id="genre_check" value="genre" 
        onChange={props.handleColumnCheck} checked={props.genre_check}/>
      <label className="conditions" for="genre_check">Genre</label>
      <select 
        className="comparator" 
        id="genre_comparator" 
        value={props.genre_comparator} 
        onChange={props.handleFormChange}>
        <option value="=">=</option>
        <option value="!=">!=</option>
      </select>
      <select 
        id="genre_value" 
        style={style.date}
        value={props.genre_value} 
        onChange={props.handleFormChange}
      >
        <option value="FPS">FPS</option>
        <option value="Third-Person Shooter">Third-Person Shooter</option>
        <option value="Hack and Slash">Hack and Slash</option>
      </select>
    </div>
  )
}

const getSortBy = (props) => {
  return Array(4).fill().map((_,i) => {
    return (
      <div>
        {/* <input
          id={`sort_${key}_check`}
          type="checkbox"
          onChange={props.handleColumnCheck} checked={props[`sort_${key}_check`]}
        /> */}
        <label>{i+1}</label>
        <select 
          id={`sort_${i+1}_column`}
          style={style.select}
          onChange={props.handleFormChange}
        >
          <option value=""></option>
          <option value="gid">gid</option>
          <option value="title">title</option>
          <option value="releaseDate">releaseDate</option>
          <option value="genre">genre</option>
        </select>
        <select 
          id={`sort_${i+1}_dir`}
          style={style.sort}
          onChange={props.handleFormChange}
        >
          <option value=""></option>
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
    </div>
    )
  });
}

const Filter = props => {
  return (
    <div className="filter">
      <h3>Filter Games</h3>
      <form
        onSubmit={props.submitFilter}
      >
        <h4>Conditions</h4>
        {getConditions(props)}
        <br/>
        <h4>Sort By</h4>
        {getSortBy(props)}
        <br/>
        <br/>
        <input className="filter-button" type="submit" value="FILTER"/>
      </form>
    </div>
  )
}

export default Filter;