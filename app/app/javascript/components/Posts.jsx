import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

const Posts = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/v1/posts?page=${page}`);
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data.posts);
                    setTotalPages(data.total_pages);
                } else {
                    throw new Error("API error");
                }
            } catch {
                navigate("/");
            }
        };

        fetchPosts();
    }, [page, navigate]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const allPosts = posts.map((post, index) => (
        <div key={index} className="row">
            <div className="col">
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                    {post.title}
                </a>
            </div>
        </div>
    ));

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
                    <p className="lead text-muted">You can read your posts.</p>
                </div>
                <div className="py-5">
                    <main className="container">
                        <Breadcrumb paths={breadcrumbPaths}/>
                        {posts.length > 0 ? allPosts : noPosts}
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    <button className="page-link" onClick={() => handlePageChange(page - 1)}
                                            disabled={page <= 1}>
                                        Previous
                                    </button>
                                </li>
                                {[...Array(totalPages).keys()].map(num => (
                                    <li key={num} className="page-item">
                                        <button
                                            className={`page-link ${num + 1 === page ? 'active' : ''}`}
                                            onClick={() => handlePageChange(num + 1)}
                                        >
                                            {num + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className="page-item">
                                    <button className="page-link" onClick={() => handlePageChange(page + 1)}
                                            disabled={page >= totalPages}>
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </main>
                </div>
            </section>
        </>
    );
};

export default Posts;
