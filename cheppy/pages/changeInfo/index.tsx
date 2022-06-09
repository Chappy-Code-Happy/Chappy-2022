import React, { FunctionComponent, useState } from "react";
import { request } from "graphql-request";
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import StudentInfo from "./components/StudentInfo";
import { getUserInfo } from "../../constants";
import ChangePassword from "./components/ChangePassword";


const ChangeInfo: NextPage = ({ result }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <StudentInfo Props={result}></StudentInfo>
      <ChangePassword></ChangePassword>
    </div>
  );
};


export const getStaticProps: GetStaticProps = async () => {
  //the first argument is the URL of our GraphQL server
  const res = await request("http://localhost:3000/api/userServer", getUserInfo);
  const result = res.showUserInfo;
  console.log("test ", result)
  
  return {
    props: {
      result,
    }, // will be passed to the page component as props
  };
};

export default ChangeInfo;