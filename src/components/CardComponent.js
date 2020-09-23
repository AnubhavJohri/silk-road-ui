import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles({
//   card: {
//     maxWidth: 345,
//   },
// });

export default function ImgMediaCard( post ) {
  //const classes = useStyles();
  const classes = makeStyles({
    card: {
      maxWidth: 345,
    },
  });

  return (
    <Card className={classes.card}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h3" component="h2">
          {post.postTitle}
          </Typography>
          <Typography gutterBottom variant="h8" component="h4">
            Author :{post.postAuthor}
          </Typography>
          <Typography gutterBottom variant="h8" component="h4">
            About :{post.postDescription}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.post}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
