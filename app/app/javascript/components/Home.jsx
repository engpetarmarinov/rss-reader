import React from "react";
import {Link} from "react-router-dom";

export default () => (
    <div className="min-vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
            <div className="container secondary-color">
                <h1 className="display-4">RSS Reader</h1>
                <p className="lead">
                    RSS Feed Reader App
                </p>
                <hr className="my-4"/>
                <div className="row">
                    <div className="col-6">
                        <Link
                            to="/feeds"
                            className="btn btn-lg custom-button"
                            role="button"
                        >
                            View Feeds
                        </Link>
                    </div>
                    <div className="col-6">
                        <Link
                            to="/posts"
                            className="btn btn-lg custom-button"
                            role="button"
                        >
                            View Posts
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
