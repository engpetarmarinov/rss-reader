import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

const Posts = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const url = "/api/v1/posts";
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("api error");
            })
            .then((res) => setPosts(res))
            .catch(() => navigate("/"));
    }, []);

    const allPosts = posts.map((post, index) => (
        <div key={index} className="row">
            <div className="col">
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                    {post.title}
                </a>
            </div>
        </div>
    ))

    const noPosts = (
        <div className="row align-items-center justify-content-center">
            No posts yet.
        </div>
    );

    const breadcrumbPaths = [
        {name: "Home", href: "/"},
        {name: "Posts"}
    ];

    return (
        <>
            <section className="jumbotron jumbotron-fluid text-center">
                <div className="container py-5">
                    <h1 className="display-4">Posts! Here you are!</h1>
                    <p className="lead text-muted">
                        You can read your posts.
                    </p>
                </div>
                <div className="py-5">
                    <main className="container">
                        <Breadcrumb paths={breadcrumbPaths} />
                        {posts.length > 0 ? allPosts : noPosts}
                    </main>
                </div>
            </section>
        </>
    );
};

export default Posts;