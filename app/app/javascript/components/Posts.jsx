import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

const useDebounce = (func, delay) => {
    const timeoutIdRef = useRef(null);

    return (...args) => {
        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const Posts = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [query, setQuery] = useState("");
    const [queryValue, setQueryValue] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/v1/posts?page=${page}&query=${query}`);
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
    }, [page, query, navigate]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleSearchChange = (value) => {
        setQuery(value);
        setPage(1); // Reset to first page on new search
    };

    const debouncedSearch = useDebounce(handleSearchChange, 500);
    const handleSearchValueChange = (e) => {
        setQueryValue(e.target.value);
        debouncedSearch(e.target.value); // Update the state with a delay
    };

    const allPosts = posts.map((post, index) => (
        <li key={index} className="list-group-item">
            <a href={post.link} target="_blank" rel="noopener noreferrer">
                {post.title}
            </a>
        </li>
    ));

    const noPosts = (
        <li className="list-group-item">
            {query.length > 0 ? "No posts found." : "No posts yet."}
        </li>
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
                        <div className="row mb-4">
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search posts..."
                                    value={queryValue}
                                    onChange={handleSearchValueChange}
                                />
                            </div>
                        </div>
                        <ul className="list-group list-group-horizontal-xxl">
                            {posts.length > 0 ? allPosts : noPosts}
                        </ul>
                        <hr className="border-2 border-top" />
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
