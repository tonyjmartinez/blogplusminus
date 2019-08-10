import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import withAppContext from '../../context/withAppContext';
import PostForm from './post/PostForm';
import { useMediaQuery } from 'react-responsive';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const PostDialog = props => {
  console.log(props);
  const handleNewPost = async (title, content) => {
    const newPost = await props.context.newPost(
      props.context.user.id,
      title,
      content,
      props.context.user.username,
      props.context.user.token
    );
    props.onClose();
    console.log(newPost);
  };

  const desktop = useMediaQuery({ query: '(min-width: 850px)' });
  console.log('desktop', desktop);

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition}
    >
      <PostForm
        onClose={props.onClose}
        newPost={handleNewPost}
        desktop={desktop}
        {...props}
      />
    </Dialog>
  );
};

export default withAppContext(PostDialog);
