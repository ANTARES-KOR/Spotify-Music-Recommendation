import type { NextPage } from "next";
import WebPlayback from "../components/WebPlayback";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <>
      <div>Main Page</div>
      <WebPlayback token="BQDDDivGJk1nrh0euvp9CfkRE4NrTgkaKYTc4ILeI09qptet_Y1BlSWR_1PZ4J9TXY5SEIW7--JR6PIZHTACa_xCAaPc0Okd_qd3e_SgrOfc0M-CimZ-1z3VGMfXy0_QSGp9JP2OubldJzOwRj7jpboDX0xqNBsFyGoTWoT3XFzGDdW_X0fmkrhxE1FtEY9Ebsue-vN1Tjq5lLH8NlBxA9u6V4PE" />
    </>
  );
};

export default Home;
