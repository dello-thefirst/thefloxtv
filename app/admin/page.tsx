"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";

function Admin() {
  //...
  const [movieIdList, setMovieIdList] = useState([]);
  const [iterator, setIterator] = useState(0);

  const fetchIds = async () => {
    const res = await axios.get("https://floxapi.000webhostapp.com/all/");
    setMovieIdList(res.data);
  };

  let completedTransfers = [];
  const migrate = async () => {
    async function postData(id: string) {
      try {
        const res = await axios.post(`/api/series`, { id: id });
        console.log(res.data);
        if (res.status < 300) {
          completedTransfers.push(id);
          postData(movieIdList[completedTransfers.length]);
        }
      } catch (error) {
        completedTransfers.push(id);
        postData(movieIdList[completedTransfers.length]);
      }
    }

    movieIdList.slice(0, 1).map((id) => postData(movieIdList[0]));
  };

  return (
    <>
      <Header page="admin" />
      <main className="w-full mt-[200px] center-div">
        <button className="btn font-serif font-normal" onClick={fetchIds}>
          Fetch IDs
        </button>
        {movieIdList.length > 0 && (
          <button className="btn font-sans" onClick={migrate}>
            Run Migration
          </button>
        )}
      </main>
    </>
  );
}

export default Admin;
