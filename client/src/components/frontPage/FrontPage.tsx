import React, {
  useState,
  PropsWithChildren,
  ComponentProps,
  StatelessComponent,
  ReactElement
} from 'react';
import { makeStyles } from '@material-ui/styles';
import InfiniteScroll from 'react-infinite-scroller';
import query from '../../queries/recentPosts';
import { graphql, useQuery } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import PostCard from './PostCard';
import withAppContext from '../../context/withAppContext';

interface Props {
  data: {
    loading: boolean;
    fetchMore: Function;
    recentPosts: [];
  };
  context: {
    darkMode: boolean;
  };
}

interface fetchResult {
  fetchMoreResult?: any;
  variables?: { skip: number } | undefined;
}

const useStyles = makeStyles({
  post: {
    padding: '2em',
    marginTop: '1em',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '70%'
  },
  loader: {
    marginLeft: '0px auto',
    marginRight: '0px auto',
    marginTop: '1em'
  },
  circle: {
    margin: '0px auto',
    width: '10%',
    paddingTop: '10px'
  }
});

const FrontPage = (props: Props) => {
  const classes = useStyles();

  const [pagination, setPagination] = useState({
    page: 0,
    morePosts: true
  });

  const posts = useQuery(query);

  const fetchMorePosts = async () => {
    if (posts.data.loading) {
      return;
    }
    if (pagination.morePosts) {
      console.log(posts);
      await posts.fetchMore({
        variables: {
          skip: pagination.page + 10
        },

        updateQuery: (prev: any, { fetchMoreResult }: fetchResult) => {
          if (!fetchMoreResult || fetchMoreResult.recentPosts.length === 0) {
            setPagination({
              ...pagination,
              morePosts: false
            });
            return prev;
          }

          const newPosts = Object.assign({}, prev, {
            recentPosts: [...prev.recentPosts, ...fetchMoreResult.recentPosts]
          });

          setPagination({
            ...pagination,
            page: pagination.page + 5
          });
          return newPosts;
        }
      });
    }
  };

  const Posts: StatelessComponent<Props> = props => {
    //  if (!props.data.loading && props.data.recentPosts !== undefined) {
    const newPosts = posts.data.recentPosts;
    const postCards = newPosts.map((post: any, idx: number) => {
      return (
        <div key={idx} className={classes.loader}>
          <PostCard darkMode={props.context.darkMode} frontPage post={post} />
        </div>
      );
    });
    return <>{postCards}</>;
  };

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchMorePosts}
        hasMore={pagination.morePosts}
        loader={
          <div key={1} className={classes.circle}>
            <CircularProgress color="secondary" />
          </div>
        }
      >
        {posts.data.recentPosts !== undefined ? (
          <Posts {...props} />
        ) : (
          <div>Loading...</div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default withAppContext(FrontPage);
