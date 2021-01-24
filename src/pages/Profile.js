import React, { useContext, useEffect, Fragment } from "react";
import { GithubContext } from "../context/github/githubContext";
import { Link } from "react-router-dom";
import { Repos } from "../components/Repos";

export const Profile = ({ match }) => {
  const { getUser, getRepos, loading, user, repos } = useContext(GithubContext);
  const urlName = match.params.name;

  useEffect(() => {
    getUser(urlName);
    getRepos(urlName);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <p className="text-center">Загрузка...</p>;
  }

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
  } = user;

  return (
    <Fragment>
      <Link to="/" className="btn btn-link">
        На главную
      </Link>

      <div className="card mb-4 mt-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3 text-center">
              <img src={avatar_url} alt={name} style={{ width: "150px" }} />
              <h4 className="mt-3">{name}</h4>
              {location && <p>{location}</p>}
            </div>
            <div className="col">
              <Fragment>
                <h5>BIO</h5>
              </Fragment>
              <ul>
                {login && (
                  <li>
                    <strong>Username: </strong> {login}
                  </li>
                )}

                {bio && (
                  <li>
                    <strong>Position: </strong> {bio}
                  </li>
                )}

                {company && (
                  <li>
                    <strong>Company: </strong> {company}
                  </li>
                )}

                {blog && (
                  <li>
                    <strong>Website: </strong> {blog}
                  </li>
                )}
              </ul>

              <div>
                <div className="badge badge-primary">
                  Followers: {followers}
                </div>
                <div className="badge badge-success">
                  Following: {following}
                </div>
                <div className="badge badge-info">Repos: {public_repos}</div>
                <div className="badge badge-dark">Gists: {public_gists}</div>
              </div>

              <br />
              <a
                href={html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark "
              >
                Открыть профиль
              </a>
            </div>
          </div>
        </div>
      </div>
      <h6>REPOS:</h6>
      <Repos repos={repos} />
    </Fragment>
  );
};
