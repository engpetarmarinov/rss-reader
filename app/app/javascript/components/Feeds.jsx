import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

const Feeds = () => {
    const navigate = useNavigate();
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        const url = "/api/v1/feeds";
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("api error");
            })
            .then((res) => setFeeds(res))
            .catch(() => navigate("/"));
    }, []);

    const allFeeds = feeds.map((feed, index) => (
        <div key={index} className="col-md-6 col-lg-4">
            <div className="card mb-4">
                <img
                    src={feed.image}
                    className="card-img-top"
                    alt={`${feed.name} image`}
                />
                <div className="card-body">
                    <h5 className="card-title">{feed.name}</h5>
                    <Link to={`/feeds/${feed.id}`} className="btn custom-button">
                        View Feed
                    </Link>
                </div>
            </div>
        </div>
    ));

    const noFeed = (
        <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
            <h4>
                No feeds yet. You can <Link to="/feeds/new">create one</Link>
            </h4>
        </div>
    );

    return (
        <>
            <section className="jumbotron jumbotron-fluid text-center">
                <div className="container py-5">
                    <h1 className="display-4">Feeds! Feeds everywhere!</h1>
                    <p className="lead text-muted">
                        You can feed your feeds.
                    </p>
                </div>
            </section>
            <div className="py-5">
                <main className="container">
                    <div className="text-end mb-3">
                        <Link to="/feeds/new" className="btn custom-button">
                            Create New Feed
                        </Link>
                    </div>
                    <div className="row">
                        {feeds.length > 0 ? allFeeds : noFeed}
                    </div>
                    <Link to="/" className="btn btn-link">
                        Home
                    </Link>
                </main>
            </div>
        </>
    );
};

export default Feeds;