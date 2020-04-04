import React from 'react';
import PropTypes from 'prop-types';
import './PageTabs.css';

class PageTabs extends React.PureComponent {
  static propTypes = {
    currPage: PropTypes.number.isRequired,
    onClickHandler: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
  }

  static defaultProps = {

  }


  render() {
    const { items, currPage, onClickHandler } = this.props;

    return (
      <div className="page-tabs">
        {items.map((item, i) => 
          <button 
            type={currPage === i ? "selected" : ""}
            onClick={() => onClickHandler(i)}
          >
            {i+1}
          </button> 
        )}
      </div>
    )
  }
}

export default PageTabs