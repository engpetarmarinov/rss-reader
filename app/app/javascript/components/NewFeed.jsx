import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

const NewFeed = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [image, setImage] = useState("");

    const onChange = (event, setFunction) => {
        setFunction(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const apiURL = "/api/v1/feeds";

        if (name.length === 0 || url.length === 0)
            return;

        const body = {
            name,
            url: url,
            image: image,
        };

        const metaElement = document.querySelector('meta[name="csrf-token"]');
        const token = metaElement ? metaElement.content : "";
        fetch(apiURL, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("api error");
            })
            .then((response) => navigate(`/feeds/${response.id}`))
            .catch((error) => console.log(error.message));
    };

    const breadcrumbPaths = [
        {name: "Home", href: "/"},
        {name: "Feeds", href: "/feeds"},
        {name: "New"}
    ];

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-12 col-lg-6 offset-lg-3">
                    <h1 className="font-weight-normal mb-5">
                        Add a new feed to your collection.
                    </h1>
                    <Breadcrumb paths={breadcrumbPaths}/>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="feedName">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="feedName"
                                className="form-control"
                                required
                                onChange={(event) => onChange(event, setName)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="feedURL">Feed URL</label>
                            <input
                                type="url"
                                name="url"
                                id="feedURL"
                                className="form-control"
                                required
                                onChange={(event) => onChange(event, setUrl)}
                            />
                            <small id="urlHelp" className="form-text text-muted">
                                Enter a valid RSS Feed URL.
                            </small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="feedImage">Image URL</label>
                            <input
                                type="url"
                                name="image"
                                id="feedImage"
                                className="form-control"
                                onChange={(event) => onChange(event, setImage)}
                            />
                        </div>
                        <button type="submit" className="btn custom-button mt-3">
                            Create Feed
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewFeed;
