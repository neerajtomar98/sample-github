import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import GitHubPage from '../components/githubPage/GitHubPage';
import { fetchUserProfile, fetchRepositories, searchFilterRepository } from '../actions/actions';
import { getQueryParamsObjectFromQueryString } from '../utils/utils';

class HomeContainer extends React.Component {
    componentDidMount() {
        this.props.fetchUserProfile();
        this.props.fetchRepositories();
    }
    componentDidUpdate(prevProps) {
        let prevSearchParams = getQueryParamsObjectFromQueryString(prevProps.location.search);
        let currentSearchParams = getQueryParamsObjectFromQueryString(this.props.location.search);
        if (prevSearchParams.q !== currentSearchParams.q
            || prevSearchParams.type !== currentSearchParams.type
            || prevSearchParams.language !== currentSearchParams.language

        ) {
            this.props.fetchRepositories(this.props.currentSearchParams);
        }

    }

    render() {
        return (
            <div className="app-container" >
                <GitHubPage {...this.props} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    repositories: state.get('repositories'),
    profile: state.get('profile'),
});

const mapDispatchToProps = dispatch => ({
    fetchRepositories: (searchparams) => {
        dispatch(fetchRepositories(searchparams));
    },
    fetchUserProfile: () => {
        dispatch(fetchUserProfile());
    },
    searchFilterRepository: (pathname, searchText, type, language) => {
        dispatch(searchFilterRepository(pathname, searchText, type, language));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(HomeContainer)
);
