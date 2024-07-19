import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

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
                        {posts.length > 0 ? allPosts : noPosts}
                        <Link to="/" className="btn btn-link">
                            Home
                        </Link>
                    </main>
                </div>
            </section>
        </>
    );
};

export default Posts;