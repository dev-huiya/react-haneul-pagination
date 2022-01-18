import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import cx from "classnames";
import Paginator from "paginator";
import PageButton from "./Button";
import * as IconHi from "react-icons/hi";

function Pagination({
    totalItemCount,
    onChange,
    activePage,
    itemsCountPerPage,
    navigationPageRange,
    navigationMoveType,
    prevPageText,
    nextPageText,
    lastPageText,
    firstPageText,
    containerClassName,
    pageContainerClassName,
    activeClassName,
    itemClassName,
    itemFirstClassName,
    itemPrevClassName,
    itemNextClassName,
    itemLastClassName,
    hideDisabled,
    hideFirstLastButton,
    hidePrevNextButton,
}) {

    const [paginationInfo, setPaginationInfo] = useState({});

    useEffect(()=>{
        const paginationInfo = new Paginator(
            itemsCountPerPage,
            navigationPageRange
        ).build(totalItemCount, activePage);

        if(navigationMoveType == "block") {
            const block = Math.floor((paginationInfo.current_page - 0.1) / paginationInfo.pages);
            const first = block * paginationInfo.pages + 1;
            let last = (block + 1) * paginationInfo.pages;
            if(last > paginationInfo.total_pages) {
                last = paginationInfo.total_pages;
            }

            paginationInfo.first_page = first;
            paginationInfo.last_page = last;
            paginationInfo.previous_page = first - 1;
            paginationInfo.next_page = last + 1;
            paginationInfo.has_previous_page = (first - 1) > 0;
            paginationInfo.has_next_page = (last + 1) < paginationInfo.total_pages;
        }

        setPaginationInfo(paginationInfo);
    }, [totalItemCount, activePage, itemsCountPerPage, navigationPageRange, navigationMoveType])

    const _callback = useCallback((pageNumber)=>{
        if(pageNumber != activePage) {
            onChange(pageNumber);
        }
    }, [onChange, activePage]);

    const build = useCallback(()=>{
        const pages = [];

        // 페이지 버튼
        for (
            let i = paginationInfo.first_page;
            i <= paginationInfo.last_page;
            i++
        ) {
            pages.push(
                <PageButton
                    key={"page_"+i}
                    className={cx(itemClassName, {
                        [activeClassName]: i == activePage,
                    })}
                    onClick={()=>{
                        _callback(i);
                    }}
                    onKeyDown={(e)=>{
                        if(e.key == "Enter" || e.key == " ") {
                            _callback(i);
                        }
                    }}
                >{i}</PageButton>
            );
        }

        return pages;
    }, [paginationInfo, _callback, activeClassName, activePage, itemClassName])

    const isFirstButtonVisible = useCallback(()=>{
        if (hideFirstLastButton || (hideDisabled && paginationInfo.current_page == 1)) return false;
        return true;
    }, [paginationInfo, hideFirstLastButton, hideDisabled]);

    const isPrevButtonVisible = useCallback(()=>{
        if (hidePrevNextButton || (hideDisabled && !paginationInfo.has_previous_page)) return false;
        return true;
    }, [paginationInfo, hidePrevNextButton, hideDisabled]);

    const isNextButtonVisible = useCallback(()=>{
        if (hidePrevNextButton || (hideDisabled && !paginationInfo.has_next_page)) return false;
        return true;
    }, [paginationInfo, hidePrevNextButton, hideDisabled]);

    const isLastButtonVisible = useCallback(()=>{
        if (hideFirstLastButton || (hideDisabled && paginationInfo.current_page == paginationInfo.total_pages)) return false;
        return true;
    }, [paginationInfo, hideFirstLastButton, hideDisabled]);

    return (
        <React.Fragment>
            <div
                className={cx(containerClassName)}
            >
                <div className={cx(pageContainerClassName)}>
                    {isFirstButtonVisible() && (
                        <PageButton
                            className={cx(itemClassName, itemFirstClassName)}
                            onClick={()=>{
                                _callback(1);
                            }}
                            onKeyDown={(e)=>{
                                if(e.key == "Enter" || e.key == " ") {
                                    _callback(1);
                                }
                            }}
                            disabled={paginationInfo.current_page == 1}
                        >{firstPageText}</PageButton>
                    )}

                    {isPrevButtonVisible() && (
                        <PageButton
                            className={cx(itemClassName, itemPrevClassName)}
                            onClick={()=>{
                                _callback(paginationInfo.previous_page);
                            }}
                            onKeyDown={(e)=>{
                                if(e.key == "Enter" || e.key == " ") {
                                    _callback(paginationInfo.previous_page);
                                }
                            }}
                            disabled={!paginationInfo.has_previous_page}
                        >{prevPageText}</PageButton>
                    )}

                    {build()}

                    {isNextButtonVisible() && (
                        <PageButton
                            className={cx(itemClassName, itemNextClassName)}
                            onClick={()=>{
                                _callback(paginationInfo.next_page);
                            }}
                            onKeyDown={(e)=>{
                                if(e.key == "Enter" || e.key == " ") {
                                    _callback(paginationInfo.next_page);
                                }
                            }}
                            disabled={!paginationInfo.has_next_page}
                        >{nextPageText}</PageButton>
                    )}

                    {isLastButtonVisible() && (
                        <PageButton
                            className={cx(itemClassName, itemLastClassName)}
                            onClick={()=>{
                                _callback(paginationInfo.total_pages);
                            }}
                            onKeyDown={(e)=>{
                                if(e.key == "Enter" || e.key == " ") {
                                    _callback(paginationInfo.total_pages);
                                }
                            }}
                            disabled={activePage == paginationInfo.total_pages}
                        >{lastPageText}</PageButton>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}

Pagination.propTypes = {
    totalItemCount: PropTypes.number.isRequired, // 아이템 총 개수
    onChange: PropTypes.func.isRequired,
    activePage: PropTypes.number.isRequired,
    itemsCountPerPage: PropTypes.number, // 페이지당 아이템 개수
    navigationPageRange: PropTypes.number, // 네비게이션 페이지 범위
    navigationMoveType: PropTypes.oneOf(["block", "scroll"]), // 네비게이션 작동 타입. block, scroll
    prevPageText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    nextPageText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    firstPageText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    lastPageText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    containerClassName: PropTypes.string, // 전체 영역 클래스 이름
    pageContainerClassName: PropTypes.string, // 페이지 번호 영역 클래스 이름
    activeClassName: PropTypes.string, // 현재 페이지 클래스 이름
    itemClassName: PropTypes.string, // 페이지 기본 클래스 이름
    itemPrevClassName: PropTypes.string,
    itemNextClassName: PropTypes.string,
    itemFirstClassName: PropTypes.string, // 맨 처음
    itemLastClassName: PropTypes.string,
    hideDisabled: PropTypes.bool,
    hideFirstLastButton: PropTypes.bool,
    hidePrevNextButton: PropTypes.bool,
}

Pagination.defaultProps = {
    activePage: 1,
    itemsCountPerPage: 10,
    navigationPageRange: 5,
    navigationMoveType: "scroll",
    prevPageText: (
        <React.Fragment>
            <IconHi.HiChevronLeft size={"20px"} />
            <span>Prev</span>
        </React.Fragment>
    ),
    nextPageText: (
        <React.Fragment>
            <span>Next</span>
            <IconHi.HiChevronRight size={"20px"} />
        </React.Fragment>
    ),
    firstPageText: (
        <React.Fragment>
            <IconHi.HiChevronDoubleLeft size={"18px"} />
            <span>First</span>
        </React.Fragment>
    ),
    lastPageText: (
        <React.Fragment>
            <span>Last</span>
            <IconHi.HiChevronDoubleRight size={"18px"} />
        </React.Fragment>
    ),
    containerClassName: "_pagination-container",
    pageContainerClassName: "pages",
    itemClassName: "page",
    activeClassName: "active",
    itemPrevClassName: "prev",
    itemNextClassName: "next",
    itemFirstClassName: "first", // 맨 처음
    itemLastClassName: "last",
    hideDisabled: false,
    hideFirstLastButton: false,
    hidePrevNextButton: false,
    // TODO: disabled 옵션 추가 바람
}

export default Pagination;