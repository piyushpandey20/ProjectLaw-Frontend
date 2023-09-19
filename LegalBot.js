import React, { useState, useEffect } from 'react';
import dummy from "../dummyData.json";
import { Spinner } from './Spinner';

export const LegalBot = () => {

    const [loading,setLoading] = useState(false);
    const [query,setQuery] = useState("");
    const [ans,setAns] = useState("");
    

    async function fetchData(query){
        console.log(query);
        setLoading(true);
        try{
            {
                dummy.map((data,index) => {
                    if(data.Query == query ){
                        setAns(data.Answer);
                    }
                })
            }
        }
        catch(error){
            console.log("Error while fetching query related data");
            setQuery([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    },[]);

    function clickHandler(){
        fetchData(query);
    }

    function changeHander(event){
        setQuery(event.target.value);
    }

  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className="mt-[15px] text-2xl underline uppercase font-bold">Query: {query}</h1>
        {
            loading?(<Spinner/>) : (
                query.length === 0 ?
                (
                    <div>
                        <p>Try writing your query </p>
                    </div>
                ) :
                (
                    //query related data from api
                    //will update later
                    <div >
                        <p>Here is query's solution</p>
                        <div>
                            <p>{ans}</p>
                        </div>
                    </div>
                    
                )
            )
        }
        <div className='flex absolute bottom-2 left-8 right-20 w-full gap-10 '>
            <input
            className="border-dashed border-2 border-sky-500  w-9/12 text-lg py-2 rounded-lg mb-[3px] text-center"
            onChange={changeHander}
            value={query}
            />
            <button className="w-[200px] bg-yellow-500 text-lg py-2 rounded-lg mb-[3px] text-center" onClick={clickHandler}>
            Generate
            </button>
        </div>
        
    </div>
  )
}
