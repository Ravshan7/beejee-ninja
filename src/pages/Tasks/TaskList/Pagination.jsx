import React from 'react';

const Pagination = ({
                        quantity,
                        currentPage,
                        paginationClick,
                        isLoadingPage
                    }) => <div style={{display: "flex", justifyContent: 'center', marginTop: '20px'}}>
    <ul className="pagination">
        <li
            className={currentPage === quantity[0]
                ? "disabled"
                : "waves-effect"}
            onClick={(!isLoadingPage && (currentPage !== quantity[0]))
                ? (() => paginationClick('prev'))
                : undefined}>
            <a>
                <i className="material-icons">chevron_left</i>
            </a>
        </li>
        {quantity.map(page => <li
            key={page}
            className={`${page === currentPage ? 'active' : ''}`}
            onClick={(!isLoadingPage && (currentPage !== page)) ? (() => paginationClick(page)) : undefined}
        ><a style={{cursor: "pointer"}}>{page}</a>
        </li>)}
        <li
            className={currentPage === quantity[quantity.length - 1]
                ? "disabled"
                : "waves-effect"}
            onClick={(!isLoadingPage && (currentPage < quantity[quantity.length - 1]))
                ? (() => paginationClick('next'))
                : undefined}>
            <a>
                <i className="material-icons">chevron_right</i>
            </a>
        </li>
    </ul>
</div>


export default Pagination;
