import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

const Feed = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        const url = `/api/v1/feeds/${params.id}`;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("api error");
            })
            .then((response) => setFeed(response))
            .catch(() => navigate("/feeds"));
    }, [params.id]);

    const addHtmlEntities = (str) => {
        return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    };

    const deleteFeed = () => {
        const url = `/api/v1/feeds/${params.id}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url, {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("api error");
            })
            .then(() => navigate("/feeds"))
            .catch((error) => console.log(error.message));
    };

    const feedURL = addHtmlEntities(feed.url);

    return (
        <div className="">
            <div className="hero position-relative d-flex align-items-center justify-content-center">
                <img
                    src={feed.image}
                    alt={`${feed.name} image`}
                    className="img-fluid position-absolute"
                />
                <div className="overlay bg-dark position-absolute"/>
                <h1 className="display-4 position-relative text-white">
                    {feed.name}
                </h1>
            </div>
            <div className="container py-5">
                <div className="row">
                    <div className="col-sm-12 col-lg-7">
                        <h5 className="mb-2">Feed URL</h5>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: `${feedURL}`,
                            }}
                        />
                    </div>
                    <div className="col-sm-12 col-lg-2">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={deleteFeed}
                        >
                            Delete Feed
                        </button>
                    </div>
                </div>
                <Link to="/feeds" className="btn btn-link">
                    Back to Feeds
                </Link>
            </div>
        </div>
    );
};

export default Feed;