import React, {useState, useCallback} from 'react';

import "./example.css";

import Pagination from "../lib";
import "lib/style.css";

function Page() {

    const [page, setPage] = useState(1);
    const [setting, setSetting] = useState({
        totalItemCount: 10000,
        navigationPageRange: 10,
        itemsCountPerPage: 10,
    })

    const onChange = useCallback((e)=>{
        const target = e.currentTarget || e.target;
        setSetting(prev=>({
            ...prev,
            [target.name]: target.value,
        }))
    }, [])

    return (
        <React.Fragment>
            <div className={"example"}>
                <div className={"center"}>
                    <a
                        href={"https://github.com/dev-huiya/react-haneul-pagination"}
                        className={"logo"}
                    >@haneul/pagination</a>
                    <div className={"setting"}>
                        <div className={"title"}>number values</div>
                        <div className={"control input"}>
                            <span>page</span>
                            <input
                                className={"input"}
                                name={"page"}
                                value={page}
                                onChange={(e)=>{
                                    const target = e.currentTarget || e.target;
                                    setPage(target.value)
                                }}
                                type={"number"}
                            />
                            {Object.keys(setting).map((key, i)=>(
                                <React.Fragment key={key}>
                                    <span>{key}</span>
                                    <input
                                        className={"input"}
                                        name={key}
                                        value={setting[key]}
                                        onChange={onChange}
                                        type={"number"}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/*TODO: 예제 코드 추가 바람. yarn add react-code-blocks*/}
                    <Pagination
                        {...setting}
                        onChange={(number) => {
                            console.log("current page", number);
                            setPage(number);
                        }}
                        activePage={page}
                    />
                    <Pagination
                        {...setting}
                        onChange={(number) => {
                            console.log("current page", number);
                            setPage(number);
                        }}
                        activePage={page}
                        navigationMoveType={"block"}
                    />
                    <Pagination
                        {...setting}
                        onChange={(number) => {
                            console.log("current page", number);
                            setPage(number);
                        }}
                        activePage={page}
                        hideFirstLastButton={true}
                    />
                    <Pagination
                        {...setting}
                        onChange={(number) => {
                            console.log("current page", number);
                            setPage(number);
                        }}
                        activePage={page}
                        hidePrevNextButton={true}
                    />
                    <Pagination
                        {...setting}
                        onChange={(number) => {
                            console.log("current page", number);
                            setPage(number);
                        }}
                        activePage={page}
                        hideFirstLastButton={true}
                        hidePrevNextButton={true}
                    />
                    <Pagination
                        {...setting}
                        onChange={(number) => {
                            console.log("current page", number);
                            setPage(number);
                        }}
                        activePage={page}
                        hideDisabled={true}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Page;