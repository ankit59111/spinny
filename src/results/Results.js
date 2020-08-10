import React from "react";
import ResultCard from "./card/card";

export default function ResultList(props) {
    return(
        <React.Fragment>
            <div className={'cards'}>
                {props.data.map(item=>{
                    return <ResultCard {...item}/>
                })}

            </div>
            {props.lastPage>props.currentPage?
                <button onClick={props.handleLoadMore}>Load More</button>
                :null}
        </React.Fragment>
    )
}