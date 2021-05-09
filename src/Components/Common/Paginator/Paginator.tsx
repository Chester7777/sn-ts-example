import React, {useState} from "react";
import styles from "./Paginator.module.css"


type PaginatorType = {
    totalItemsCount: number
    pageSize: 10
    portionSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export let Paginator = (props: PaginatorType) => {

    let pagesCount = Math.ceil(props.totalItemsCount / props.portionSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / props.pageSize);
    let [portionNumber, setPortionNumber] = useState<number>(1);
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize;

    return (
        <div className={styles.paginator}>
        {portionNumber > 1 &&
        <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>PREV</button>
        }
            {
                pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => {
                        return <span className={cn({
                            [styles.selectedPage]: props.currentPage === p
                        }, styles.pageNumber)}
                                     key={p}
                                     onClick={(e) => {
                                         props.onPageChanged(p)
                                     }}>{p}</span>
                    })
            }
            {
                portionCount > portionNumber &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>PREV</button>
            }

        </div>
    )
}