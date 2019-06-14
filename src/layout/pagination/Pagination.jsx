import React from 'react'
import ButtonGroup from '../../components/button-group/ButtonGroup'
import Button from '../../components/button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import './Pagination.css'
import { withContext } from '../../context'

const Pagination = ({ page, onPagination, res }) => {
  const { hasMore = true } = res
  console.log('P', res)

    const renderPaginationBtns = (onClick, page, hasMore) => {
      
      let btnsArr = [];
      
      switch (page) {
        case 0: hasMore === true ? btnsArr = [page + 1, page + 2] : btnsArr = [page + 1];
          break;
        case 1: hasMore === true ? btnsArr = [page, page + 1, page + 2] : btnsArr = [page, page + 1];
          break;
        case 2: hasMore === true ? btnsArr = [page - 1, page, page + 1, page + 2] : btnsArr = [page - 1, page, page + 1];
          break;
        default: hasMore === true ? btnsArr = [page - 2, page - 1, page, page + 1, page + 2] : btnsArr = [page - 2, page - 1, page, page + 1];
          break;
      }
    
      return btnsArr.map(num => {
        return <Button
          key={num-1}
          onClick={onPagination}
          data-name={num-1}
          className={num -1 === page ? 'active' : ''}
        >{num}</Button>
      });
    };

    return (
        <div className="pagination">
        <ButtonGroup> 
            {page !== 0 && <Button
                data-name="prev"
                onClick={onPagination}
            >
                <FontAwesomeIcon icon={faAngleLeft} />
            </Button>}  
            
            {renderPaginationBtns(onPagination, page, hasMore)}
            
            {hasMore !== false &&  <Button
                onClick={onPagination} 
                data-name="next"
            >
                <FontAwesomeIcon icon={faAngleRight} />  
            </Button>}

        </ButtonGroup>
    </div>
    )
}

export default withContext(Pagination)