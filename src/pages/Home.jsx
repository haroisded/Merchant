import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import PageWrapper from "../components/PageWrapper";

//DRY

const Home = () => {
	return (
		<PageWrapper>
			<Header />
			<Main>This is the homepage</Main>
			<Footer />
		</PageWrapper>
	);
};

export default Home;
