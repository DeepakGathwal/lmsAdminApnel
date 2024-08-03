import React from 'react'
import { Pagination } from "antd"

const Pajination = ({setPostPerPage, postPerpage, page, setPage, total, posts}) => {
   
  const onShowSizeChange = (current, pageSize) => {
    setPostPerPage(pageSize)
  }


    const itemRender = (current, type, originalElement) => {
        if (type === "prev") {
          return <a>Previous</a>
        }
        if (type === "next") {
          return <a>Next</a>
        }
        return originalElement
      }

  return (
    <div className="lowerbody m-3">
    <div aria-label="Page navigation example">
      <span> Showing {page * postPerpage - postPerpage + 1} to {page * postPerpage} of {total} entries</span>
    </div>
    <div className="pagination">
      <Pagination
        onChange={(value) => setPage(value)}
        pageSize={postPerpage}
        total={total}
        current={page}
        showSizeChanger
        showQuickJumper
        onShowSizeChange={onShowSizeChange}
        itemRender={itemRender}
      />
    </div>
  </div>
  )
}

export default Pajination