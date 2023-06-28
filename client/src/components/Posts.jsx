import { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { API } from '../utils/api';
import PostDetails from './PostDetails';

const Posts = () => {
  const [posts, getPosts] = useState([]);
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      try{
      let response = await API.getAllPosts({ category: category || '' });
      if (response.isSuccess) {
        getPosts(response.data);
      }
    }catch(error){
      console.log('Error:', error);
    }
      
    };

    fetchData();
  }, [category]);

  return (
    <>
      {
        posts?.length ? posts.map(post => (
          // key=index,
          <Grid key={post._id} item lg={3} sm={4} xs={12}>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`details/${post._id}`}>
              <PostDetails key={post._id} post={post} />
            </Link>
          </Grid>
        )) : (
          <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
            No data is available for selected category
          </Box>
        )
      }
    </>
  );
};

export default Posts;